import {PasswordResetEmailData, VerificationEmailData} from "@/src/emails/types/email.types";
import {EmailService} from "@/src/emails/services/EmailService";
import {emailConfig} from "@/src/emails/config/config";
import {renderVerificationEmail, renderVerificationEmailText} from "@/src/emails/templates/VerificationEmail";
import {renderPasswordResetEmail, renderPasswordResetEmailText} from "@/src/emails/templates/PasswordResetEmail";

export class AuthEmailService {

    static async sendVerificationEmail(data: VerificationEmailData): Promise<void>  {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: 'Meeti - Confirma tu cuenta',
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data),
        });
    }

    static async sendPasswordResetToken(data: PasswordResetEmailData): Promise<void>  {
        await EmailService.send({
            from: emailConfig.from.passwordReset,
            to: data.email,
            subject: 'Meeti - Reestablece tu password',
            text: renderPasswordResetEmailText(data),
            html: renderPasswordResetEmail(data),
        });
    }

}