import Headings from "@/src/shared/typography/Headings";
import {Metadata} from "next";
import {generatePageTitle} from "@/src/shared/utils/metadata";
import Link from "next/link";
import SetPasswordForm from "@/src/features/auth/components/SetPasswordForm";

export const metadata: Metadata = {
    title: generatePageTitle('>Definir Nuevo Password')
}

export default function ForgotPasswordPage() {
    return (
        <>
            <Headings>Definir Nuevo Password</Headings>
            <SetPasswordForm />
            <nav className="w-full flex justify-between mt-20">
                <Link href={'/auth/login'} className="font-bold">Iniciar Sesion</Link>
                <Link href={'/auth/create-account'} className="font-bold">Crear Cuenta</Link>
            </nav>
        </>
    )
}