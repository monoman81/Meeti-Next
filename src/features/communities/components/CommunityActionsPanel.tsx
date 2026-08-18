import {CommunityPermissions} from "@/src/features/communities/types/community.types";
import Link from "next/link";
import CommunityMembership from "@/src/features/communities/components/CommunityMembership";

type CommunityActionsPanelProps = {
    permissions: CommunityPermissions,
    communityId: string,
}

export default function CommunityActionsPanel({ permissions, communityId }: CommunityActionsPanelProps) {
    return (
        <div className="flex justify-end gap-2">
            {permissions.canEdit && (
                <Link target="_blank"
                    href={`/dashboard/communities/${communityId}/edit`}
                    className="font-bold text-lg bg-orange-600 px-5 py-2 text-white"
                >
                    Editar Comunidad
                </Link>
            )}
            {permissions.canJoin || permissions.canLeave ? (
                <CommunityMembership permissions={permissions} communityId={communityId} />
            ) : null}

        </div>
    )
}
