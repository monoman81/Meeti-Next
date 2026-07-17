import {communityRepository, ICommunityRepository} from "@/src/features/communities/services/CommunityRepository";
import {CommunityInput} from "@/src/features/communities/schemas/communitySchema";
import {User} from "better-auth";
import {CommunityPolicy} from "@/src/features/communities/policies/CommunityPolicy";
import {MembershipPolicy} from "@/src/features/communities/policies/MembershipPolicy";

class CommunityService {
    constructor(private communityRepository: ICommunityRepository) {
    }

    async createCommunity(data: CommunityInput, userId: string) {
        return this.communityRepository.create({
            ...data,
            createdBy: userId
        });
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id);
        const enriched = await Promise.all(communities.map(async community => {
            const isMember = true;
            return {
                data: community,
                context: {
                    isMember,
                    isAdmin: CommunityPolicy.isAdmin(user, community),
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }
        }));
        return enriched;
    }

}

export const communityService = new CommunityService(communityRepository);