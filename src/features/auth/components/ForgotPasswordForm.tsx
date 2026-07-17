"use client"
import {useForm} from "react-hook-form";
import {Form, FormError, FormInput, FormLabel, FormSubmit} from "@/components/forms";
import {ForgotPasswordInput, ForgotPasswordSchema} from "@/src/features/auth/schemas/authSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {forgotPasswordAction} from "@/src/features/auth/actions/auth-actions";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

export default function ForgotPasswordForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: 'all'
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        const {success, error} = await forgotPasswordAction(data);
        if (error)
            toast.error(error);
        if (success) {
            toast.success(success);
            redirect('/auth/login');
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>E-mail</FormLabel>
            <FormInput
                id="email"
                placeholder="Ingresa tu E-mail"
                type="email"
                {...register('email')}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <FormSubmit value="Enviar Instrucciones" />
        </Form>
    )
}
