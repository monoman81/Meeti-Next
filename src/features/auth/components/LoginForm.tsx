"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormLabel, FormInput, FormSubmit, FormError} from "@/components/forms";
import {SignInInput, SignInSchema} from "@/src/features/auth/schemas/authSchema";
import {signInAction} from "@/src/features/auth/actions/auth-actions";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

export default function LoginForm() {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(SignInSchema),
        mode: 'all'
    });

    const onSubmit = async (data: SignInInput) => {
        const {success, error} = await signInAction(data);
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
            redirect('/dashboard');
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput type="email" id="email" placeholder="Ingresa tu email" {...register('email')} />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput type="password" id="password" placeholder="Password" {...register('password')} />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormSubmit value="Iniciar Sesion"></FormSubmit>
        </Form>
    )
}
