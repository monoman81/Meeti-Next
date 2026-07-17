import Headings from "@/src/shared/typography/Headings";
import {requireAuthentication} from "@/lib/auth-server";
import {redirect} from "next/navigation";

export default async function DashboardPage() {

    const {isAuthenticated} = await requireAuthentication();

    if (!isAuthenticated) redirect('/auth/login');

    return (
        <>
            <Headings>Panel de Administracion</Headings>
        </>
    )
}
