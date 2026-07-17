import Link from "next/link";

export default function GuestNavigation() {
    return (
        <nav className="flex justify-center items-center gap-4 mt-5 md:mt-0">
            <Link href="/auth/login" className="font-bold text-sm">Iniciar Sesion</Link>
            <Link href="/auth/create-account" className="font-bold text-sm bg-pink-600 p-2 text-white">Registrarse</Link>
        </nav>
    )
}
