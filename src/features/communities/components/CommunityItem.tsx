import {CommunityEnriched} from "@/src/features/communities/types/community.types";
import Image from "next/image";
import Link from "next/link";
import CommunityDropdownMenu from "@/src/features/communities/components/CommunityDropDownMenu";
import {pluralize} from "@/shared/utils/string";

type CommunityItemProps = {
    community: CommunityEnriched
}

export default function CommunityItem({ community }: CommunityItemProps) {

    const {name, id, image, description} = community.data;

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-start min-w-0 gap-x-4">
                <div className="size-32 flex-none overflow-hidden">
                    <Image
                        alt={`Imagen Comunidad ${name} `}
                        className="object-cover w-full h-full"
                        width={250}
                        height={250}
                        src={image}
                        priority
                    />
                </div>
                <div className="min-w-0 flex-auto">
                    <Link href={`/communities/${id}`} target="_blank" className="hover:underline font-bold text-lg">
                        {name}
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                    <p className="text-gray-600 text-sm">{community.memberCount} {pluralize('Miembro', community.memberCount)}</p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                {/* DROPDOWN MENU */}
                {community.context.isAdmin && <CommunityDropdownMenu community={community.data} />}

            </div>
        </li>
    )
}