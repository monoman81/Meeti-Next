import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";
import Headings from "@/shared/typography/Headings";
import Link from "next/link";
import {requireAuthentication} from "@/lib/auth-server";
import {redirect} from "next/navigation";
import {membershipService} from "@/src/features/communities/services/MembershipService";
import CommunityItem from "@/src/features/communities/components/CommunityItem";

const title = 'Comunidades a las que te Uniste'
export const metadata: Metadata = {
    title: generatePageTitle(title),
}

export default async function JoinedCommunitiesPage() {

    const {session} = await requireAuthentication();
    if (!session) redirect('/auth/login');

    const communities = await membershipService.getJoinedCommunities(session.user);

    return (
        <>
            <Headings>{title}</Headings>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
            >Volver a mis Comunidades</Link>
            {communities.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-100 mt-10 shadow-lg p-10">
                    {communities.map(community => (
                        <CommunityItem key={community.data.id} community={community} />
                    ))}
                </ul>
            ) : (
                <p className="text-center mt-10 text-lg">No te has unido a una comunidad aun.</p>
            )}
        </>
    )
}