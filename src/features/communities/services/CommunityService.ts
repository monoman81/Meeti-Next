import {communityRepository, ICommunityRepository} from "@/src/features/communities/services/CommunityRepository";
import {CommunityInput} from "@/src/features/communities/schemas/communitySchema";
import {User} from "better-auth";
import {CommunityPolicy} from "@/src/features/communities/policies/CommunityPolicy";
import {MembershipPolicy} from "@/src/features/communities/policies/MembershipPolicy";
import {notFound} from "next/navigation";
import {checkPassword} from "@/shared/utils/auth";
import {deleteUTFiles} from "@/lib/uploadthing-server";
import {IMembershipRepository, membershipRepository} from "@/src/features/communities/services/MembershipRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository,
        private membershipRepository: IMembershipRepository
    ) {
    }

    async createCommunity(data: CommunityInput, userId: string) {
        return this.communityRepository.create({
            ...data,
            createdBy: userId
        });
    }

    async updateCommunity(data: CommunityInput, communityId: string, user: User) {
        const community = await this.getCommunity(communityId);
        if (!CommunityPolicy.canEdit(user, community)) {
            throw new Error('No tienes permiso para editar esta comunidad');
        }
        await this.communityRepository.update(data, community.id);
    }

    async deleteCommunity(communityId: string, password: string, user: User) {
        const community = await this.getCommunity(communityId);
        if (!community) return notFound();
        if (!CommunityPolicy.canDelete(user, community)) {
            throw new Error('No tienes permiso para eliminar esta comunidad');
        }
        const isValidPassword = await checkPassword(password);
        if (!isValidPassword) {
            return {
                error: 'El password es incorreto',
                success: ''
            }
        }
        await this.communityRepository.delete(communityId);
        await deleteUTFiles(community.image);
        return {
            error: '',
            success: 'Comunidad eliminada correctamente'
        }
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id);
        return await Promise.all(communities.map(async community => {
            const memberCount = await this.membershipRepository.getMemberCount(community.id);
            const isMember = true;
            return {
                data: community,
                memberCount,
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
    }

    async getCommunity(communityId: string) {
        const community = await this.communityRepository.findById(communityId);
        if (!community) notFound();
        return community;
    }

    async getCommunityDetails(communityId: string, user?: User) {
        const community = await this.getCommunity(communityId);
        const memberCount = await this.membershipRepository.getMemberCount(community.id);
        if (!user) {
            return {
                data: community,
                memberCount,
                context: null,
                permissions: null
            }
        }

        const isMember = await membershipRepository.isMember(community.id, user.id);

        return {
            data: community,
            memberCount,
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
    }

}

export const communityService = new CommunityService(communityRepository, membershipRepository);