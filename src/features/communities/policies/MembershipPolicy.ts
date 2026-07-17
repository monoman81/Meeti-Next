import {User} from "better-auth";
import {SelectCommunity} from "@/src/features/communities/types/community.types";

export class MembershipPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean): boolean {
        return !isMember && community.createdBy !== user.id;
    }

    static canLeave(user: User, community: SelectCommunity, isMember: boolean): boolean {
        return isMember && community.createdBy !== user.id;
    }
}