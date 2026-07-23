import z from 'zod';

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, {error: 'El nombre es obligatorio'}),
    email: z.email({error: 'El emain no es valido'}),
    password: z.string().trim().min(8, {error: 'El password debe de ser minimo de 8 caracteres'}),
    passwordConfirmation: z.string().trim().min(1, {error: 'El Password de confirmacion no puede ir vacio'}),
    newPassword: z.string().trim().min(8, {error: 'El password debe de ser minimo de 8 caracteres'}),
});

export const SignUpSchema = BaseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
}).refine((data) => data.password === data.passwordConfirmation, {
    error: 'Los passwords no son iguales',
    path: ['passwordConfirmation'],
});

export const SignInSchema = BaseAuthSchema.pick({
    email: true,
}).extend({
    password: z.string().trim().min(1, {error: 'El password no puede ir vacio'}),
});

export const ForgotPasswordSchema = BaseAuthSchema.pick({
    email: true,
});

export const SetPasswordSchema = BaseAuthSchema.pick({
    newPassword: true,
    passwordConfirmation: true
}).refine((data) => data.newPassword === data.passwordConfirmation, {
    error: 'Los passwords no son iguales',
    path: ['passwordConfirmation'],
});

export const CheckPasswordSchema = z.object({
    password: z.string().min(1, {error: 'El password no puede ser vacio'}),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type SetPasswordInput = z.infer<typeof SetPasswordSchema>;
export type CheckPasswordInput = z.infer<typeof CheckPasswordSchema>;