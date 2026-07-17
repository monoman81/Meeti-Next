import {InsertCommunity, SelectCommunity} from "@/src/features/communities/types/community.types";
import {db} from "@/src/db";
import {community} from "@/src/db/schema";
import {eq} from "drizzle-orm";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity) {
        const [result] = await db.insert(community).values(data).returning();
        return result;
    }

    async findByUser(userId: string, limit = 10) {
        return await db
            .select()
            .from(community)
            .where(eq(community.createdBy, userId))
            .limit(limit);
    }
}

export const communityRepository = new CommunityRepository();