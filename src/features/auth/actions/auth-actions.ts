"use server"

import {
    ForgotPasswordInput,
    ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema,
    SignInInput,
    SignInSchema,
    SignUpInput,
    SignUpSchema
} from "@/src/features/auth/schemas/authSchema";
import {authService} from "@/src/features/auth/services/AuthService";

export const signUpAction = async (input: SignUpInput) => {
    const data = SignUpSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: '',
        }
    }
    return await authService.register(data.data);
}

export const signInAction = async (input: SignInInput) => {
    const data = SignInSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: '',
        }
    }
    return await authService.login(data.data);
}

export const forgotPasswordAction = async (input: ForgotPasswordInput) => {
    const data = ForgotPasswordSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: '',
        }
    }
    return await authService.requestPasswordReset(data.data);
}

export const setPasswordAction = async (input: SetPasswordInput, token: string) => {
    const data = SetPasswordSchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: '',
        }
    }
    return await authService.confirmPasswordReset(data.data, token);
}