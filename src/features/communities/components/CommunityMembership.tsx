"use client"

import {CommunityPermissions} from "@/src/features/communities/types/community.types";
import {useState} from "react";
import {toggleMembershipAction} from "@/src/features/communities/actions/membership-actions";
import toast from "react-hot-toast";

type Props = {
    permissions: CommunityPermissions,
    communityId: string
}

export default function CommunityMembership({ permissions, communityId }: Props) {

    const [canJoin, setCanJoin] = useState(permissions.canJoin);
    const [canLeave, setCanLeave] = useState(permissions.canLeave);

    const handleClick = async () => {
        const result = await toggleMembershipAction(communityId);
        if (result?.success) {
            toast.success(result.message);
            setCanJoin(result.newPermissions.canJoin);
            setCanLeave(result.newPermissions.canLeave);
        }
    }

    return (
        <>
            {canJoin && (
                <button onClick={handleClick}
                    className="bg-orange-600 font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer">
                    Inscribirme a esta Comunidad
                </button>
            )}
            {canLeave && (
                <button onClick={handleClick}
                    className="bg-red-600 font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer">
                    Abandonar Comunidad
                </button>
            )}
        </>
    )
}
