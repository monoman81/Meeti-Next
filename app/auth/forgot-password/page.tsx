import Headings from "@/src/shared/typography/Headings";
import {Metadata} from "next";
import {generatePageTitle} from "@/src/shared/utils/metadata";
import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: generatePageTitle('Reestablecer password')
}

export default function ForgotPasswordPage() {
    return (
        <>
            <Headings>Recupera tu acceso a Meeti</Headings>
            <ForgotPasswordForm />
            <nav className="w-full flex justify-between mt-20">
                <Link href={'/auth/login'} className="font-bold">Iniciar Sesion</Link>
                <Link href={'/auth/create-account'} className="font-bold">Crear Cuenta</Link>
            </nav>
        </>
    )
}
