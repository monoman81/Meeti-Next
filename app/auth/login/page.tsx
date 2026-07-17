import { Metadata } from "next";
import Headings from "@/src/shared/typography/Headings";
import {generatePageTitle} from "@/src/shared/utils/metadata";
import LoginForm from "@/src/features/auth/components/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: generatePageTitle('Iniciar Sesion')
}

export default function LoginPage() {
    return (
        <>
            <Headings>Iniciar Sesion</Headings>
            <LoginForm />
            <nav className="w-full flex justify-between mt-20">
                <Link href={'/auth/create-account'} className="font-bold">Crear Cuenta</Link>
                <Link href={'/auth/forgot-password'} className="font-bold">Olvide mi Contrasena</Link>
            </nav>
        </>
    )
}