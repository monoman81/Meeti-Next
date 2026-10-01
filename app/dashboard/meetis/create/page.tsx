import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";
import Headings from "@/shared/typography/Headings";
import Link from "next/link";
import CreateMeeti from "@/src/features/meetis/components/CreateMeeti";
import {requireAuthentication} from "@/lib/auth-server";
import {redirect} from "next/navigation";

const title = 'Crear Meeti'

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default async function CreateMeetiPage() {
    const {session} = await requireAuthentication();
    if (!session) redirect('/auth/login');

    return (
        <>
            <Headings>{title}</Headings>
            <Link
                href="/dashboard/meetis"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a mis Meetis</Link>
            <CreateMeeti />
        </>
    )
}
