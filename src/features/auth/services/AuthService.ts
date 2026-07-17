import {ForgotPasswordInput, SetPasswordInput, SignInInput, SignUpInput} from "@/src/features/auth/schemas/authSchema";
import {auth} from "@/lib/auth";
import {authRepository, IAuthRepository} from "@/src/features/auth/services/AuthRepository";
import {headers} from "next/headers";
import {APIError} from "better-auth";
import {email} from "zod";

class AuthService {

    constructor(private authRepository: IAuthRepository) {}

    async register(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        //Revisar is el usuario existe
        const user = await this.authRepository.userExists(email);

        if (user) {
            return {
                error: 'Este email ya esta registrado.',
                success: '',
            }
        }

        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: '/dashboard',
            },
            headers: await headers()
        });
        return {
            error: '',
            success: 'Cuenta creada correctamente. Revisa tu email.',
        }
    }

    async login(credentials: SignInInput) {
        const { email, password } = credentials;

        //Revisar is el usuario existe
        const user = await this.authRepository.userExists(email);

        if (!user) {
            return {
                error: 'El usuario no existe.',
                success: '',
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: '/dashboard',
                },
                headers: await headers()
            });
            return {
                error: '',
                success: 'Sesion iniciada correctamente.',
            }
        }
        catch (error) {
            if (error instanceof APIError) {
                const messages: Record<number, string> = {
                    401: 'Password incorrecto',
                    403: 'Tu cuenta no ha sido confirmada, hemos enviado un email'
                }
                const errorMessage = messages[error.statusCode];
                if (errorMessage) {
                    return {
                        error: errorMessage,
                        success: '',
                    }
                }
            }
        }
        return {
            error: '',
            success: '',
        }
    }

    async requestPasswordReset(input: ForgotPasswordInput) {
        const user = await this.authRepository.userExists(input.email);
        if (!user) {
            return {
                error: 'El usuario no existe.',
                success: '',
            }
        }

        await auth.api.requestPasswordReset({
            body: {
                email: input.email,
            }
        });

        return {
            error: '',
            success: 'Hemos enviado un email con instrucciones.',
        }
    }

    async confirmPasswordReset(input: SetPasswordInput, token: string) {
        try {
            await auth.api.resetPassword({
                body: {
                    newPassword: input.newPassword,
                    token: token,
                }
            });
            return {
                error: '',
                success: 'Password reestablecido correctamente.',
            }
        } catch(error) {
            if (error instanceof APIError) {
                return {
                    error: 'Token no valido o expirado',
                    success: '',
                }
            }
        }
        return {
            error: '',
            success: '',
        }
    }

}

export const authService = new AuthService(authRepository);