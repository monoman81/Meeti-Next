import {communityService} from "@/src/features/communities/services/CommunityService";
import Headings from "@/shared/typography/Headings";
import {getServerSession} from "@/lib/auth-server";
import Image from "next/image";
import CommunityActionsPanel from "@/src/features/communities/components/CommunityActionsPanel";
import {Metadata} from "next";
import {generatePageTitle} from "@/shared/utils/metadata";
import {pluralize} from "@/shared/utils/string";

export async function generateMetadata({params}: PageProps<'/communities/[id]'>): Promise<Metadata> {
    const {id} = await params;
    const community = await communityService.getCommunity(id);
    return {
        title: generatePageTitle(`Comunidad ${community.name}`)
    }
}

export default async function CommunityPage(props: PageProps<'/communities/[id]'>) {

    const {id} = await props.params;
    const session = await getServerSession();
    const community = await communityService.getCommunityDetails(id, session?.user);
    return (
        <>
            <main className="max-w-7xl mx-auto space-y-5 p-10 lg:p-0 mt-10">
                {community.permissions && (
                    <CommunityActionsPanel
                        permissions={community.permissions}
                        communityId={community.data.id}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-10">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="relative size-64 mx-auto aspect-square overflow-hidden rounded-full">
                            <Image
                                src={community.data.image} alt={`Imagen de la comunidad ${community.data.name}`}
                                width="600" height="600" className="object-cover object-center size-64"
                                priority
                            />
                        </div>
                        <Headings className="text-center">{community.data.name}</Headings>
                        <p className="text-gray-600 text-lg text-center">{community.data.description}</p>
                        <p className="text-gray-600 text-sm text-center">{community.memberCount} {pluralize('Miembro', community.memberCount)}</p>
                    </div>
                    <div className="bg-slate-100 p-5 rounded-2xl">
                        {/* Admin Aquí */}
                    </div>
                </div>
            </main>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10 max-w-7xl mx-auto mt-10 space-y-5">
                {/* Próximos Meetis Aquí */}
            </div>
        </>
    )
}
