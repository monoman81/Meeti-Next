"use server"

import {requireAuthentication} from "@/lib/auth-server";
import {membershipService} from "@/src/features/communities/services/MembershipService";

export async function toggleMembershipAction(communityId: string) {
    const {session} = await requireAuthentication();
    if (!session) throw new Error('Usuario no autenticado');
    return await membershipService.toggleMembership(communityId, session.user);
}