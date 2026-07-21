import Headings from "@/shared/typography/Headings";
import {communityService} from "@/src/features/communities/services/CommunityService";
import {requireAuthentication} from "@/lib/auth-server";
import {redirect} from "next/navigation";
import EditCommunity from "@/src/features/communities/components/EditCommunity";
import Link from "next/link";
import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";

export async function generateMetadata(
    props: PageProps<'/dashboard/communities/[id]/edit'>
): Promise<Metadata> {
    const {id} = await props.params;
    const community = await communityService.getCommunity(id);

    return {
        title: generatePageTitle(`Editar Comunidad: ${community.name}`),
        description: community.description,
        openGraph: {
            title: 'Compartir Comunidad',
            images: [
                {
                    url: community.image
                }
            ]
        }
    }
}


export default async function EditCommunityPage(props: PageProps<'/dashboard/communities/[id]/edit'>) {
    const  {session} = await requireAuthentication();
    if (!session) redirect('/auth/login');

    const {id} = await props.params;
    const community = await communityService.getCommunityDetails(id, session.user);

    if (!community.permissions.canEdit) redirect('/dashboard/communities');

    return (
        <>
            <Headings>Editar Comunidad: {community.data.name}</Headings>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a mis Comunidades</Link>
            <EditCommunity community={community.data} />
        </>
    )
}
