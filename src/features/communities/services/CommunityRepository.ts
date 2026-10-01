import {InsertCommunity, SelectCommunity} from "@/src/features/communities/types/community.types";
import {db} from "@/src/db";
import {community} from "@/src/db/schema";
import {eq} from "drizzle-orm";
import {CommunityInput} from "@/src/features/communities/schemas/communitySchema";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<SelectCommunity>;
    update(data: CommunityInput, communityId: string): Promise<void>;
    delete(communityId: string): Promise<void>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
    findById(id: string): Promise<SelectCommunity | undefined>;
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity) {
        const [result] = await db.insert(community).values(data).returning();
        return result;
    }

    async update(data: CommunityInput, communityId: string) {
        // await db.update(community).set({
        //     name: data.name,
        //     description: data.description,
        //     image: data.image,
        // }).where(eq(community.id, communityId));
        await db.update(community).set({...data}).where(eq(community.id, communityId));
    }

    async delete(communityId: string) {
        await db.delete(community).where(eq(community.id, communityId));
    }

    async findByUser(userId: string, limit = 10) {
        return db
            .select()
            .from(community)
            .where(eq(community.createdBy, userId))
            .limit(limit);
    }

    async findById(id: string) {
        const [result] = await db.select().from(community).where(eq(community.id, id)).limit(1);
        return result;
    }
}

export const communityRepository = new CommunityRepository();