import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";
import Headings from "@/shared/typography/Headings";
import Link from "next/link";

const title = 'Administra tus Meetis'

export const metadata: Metadata = {
    title: generatePageTitle(title)
}

export default function MeetisPage() {
    return (
        <>
            <Headings>{title}</Headings>
            <Link
                href="/dashboard/meetis/create"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Crear Meeti</Link>
        </>
    )
}
