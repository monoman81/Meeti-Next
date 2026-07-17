import { Metadata } from "next";
import Headings from "@/src/shared/typography/Headings";
import {generatePageTitle} from "@/src/shared/utils/metadata";
import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: generatePageTitle('Crear Cuenta')
}

export default function RegisterPage() {
    return (
        <>
            <Headings>Crear Cuenta</Headings>
            <RegisterForm />
            <nav className="w-full flex justify-between mt-20">
                <Link href={'/auth/login'} className="font-bold">Iniciar Sesion</Link>
                <Link href={'/auth/forgot-password'} className="font-bold">Olvide mi Contrasena</Link>
            </nav>
        </>
    )
}