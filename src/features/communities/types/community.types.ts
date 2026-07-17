import {community} from "@/src/db/schema";

//type InsertCommunity = InferInsertModel<typeof community>
export type InsertCommunity = typeof community.$inferInsert;
//type SelectCommunity = InferSelectModel<typeof community>
export type SelectCommunity = typeof community.$inferSelect;

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
    context: CommunityContext,
    permissions: CommunityPermissions
}