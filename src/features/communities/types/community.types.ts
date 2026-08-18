import {community, communityMembers} from "@/src/db/schema";
import {User} from "@/src/features/auth/types/auth.types";

//type InsertCommunity = InferInsertModel<typeof community>
export type InsertCommunity = typeof community.$inferInsert;
//type SelectCommunity = InferSelectModel<typeof community>
export type SelectCommunity = typeof community.$inferSelect;

export type SelectCommunityMembers = typeof communityMembers.$inferSelect;

export type JoinedCommunity = SelectCommunityMembers & {
    community: SelectCommunity,
    user: User
}

export type CommunityPermissions = {
    canEdit: boolean,
    canDelete: boolean,
    canJoin: boolean,
    canLeave: boolean,
    canViewMembers: boolean
}

export type CommunityContext = {
    isAdmin: boolean,
    isMember: boolean
}

export type CommunityEnriched = {
    data: SelectCommunity,
    memberCount: number,
    context: CommunityContext,
    permissions: CommunityPermissions
}