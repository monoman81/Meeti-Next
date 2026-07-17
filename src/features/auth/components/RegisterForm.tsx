"use client"

import {useForm} from 'react-hook-form';
import {Form, FormError, FormInput, FormLabel, FormSubmit} from "@/components/forms";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignUpInput, SignUpSchema} from "@/src/features/auth/schemas/authSchema";
import {signUpAction} from "@/src/features/auth/actions/auth-actions";
import toast from "react-hot-toast";

export default function RegisterForm() {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: 'all',
    });

    const onSubmit = async (data: SignUpInput) => {
        //console.log(data);
        const {error, success} = await signUpAction(data);
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
            reset();
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <FormInput id="name" type="text" placeholder="Ingresa tu nombre" {...register('name')} />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput id="email" type="email" placeholder="Ingresa tu email" {...register('email')} />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput id="password" type="password" placeholder="Ingresa tu password. Min. 8 caracteres" {...register('password')} />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormLabel htmlFor="password_confirmation">Repetir Password</FormLabel>
            <FormInput id="password_confirmation" type="password" placeholder="Repite tu password." {...register('passwordConfirmation')} />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

            <FormSubmit value="Registrarme" />
        </Form>
    )
}
