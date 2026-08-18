import {User} from "better-auth";
import {IMembershipRepository, membershipRepository} from "@/src/features/communities/services/MembershipRepository";
import {communityRepository, ICommunityRepository} from "@/src/features/communities/services/CommunityRepository";
import {MembershipPolicy} from "@/src/features/communities/policies/MembershipPolicy";
import {CommunityPolicy} from "@/src/features/communities/policies/CommunityPolicy";
import {INotificationService, notificationService} from "@/src/features/notificaciones/services/NotificationService";

class MembershipService {

    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository,
        private notificationService: INotificationService,
    ) {}

    async toggleMembership(communityId: string, user: User) {
        const community = await this.communityRepository.findById(communityId);
        if (!community)
            return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);

        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id);

            //Crear Notificacion y notificar al usuario
            await this.notificationService.createAndNotify({
                userId: community.createdBy,
                actorName: user.name,
                message: 'Se unio a tu comunidad',
                target: community.name,
            });

            return {
                success: true,
                message: `Te has unido a la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true,
                }
            };
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(communityId, user.id);
            return {
                success: true,
                message: `Te has salido de la comunidad ${community.name}`,
                newPermissions: {
                    canJoin: true,
                    canLeave: false,
                }
            };
        }

    }

    async getJoinedCommunities(user: User) {
        const joined= await this.membershipRepository.findJoinedCommunities(user.id);
        //console.log(joined);
        return await Promise.all(joined.map(async ({community}) => {
            const isMember = true;
            const memberCount = await this.membershipRepository.getMemberCount(community.id);
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

}

export const membershipService = new MembershipService(membershipRepository, communityRepository, notificationService);