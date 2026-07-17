"use server"
import {CommunityInput, CommunitySchema} from "@/src/features/communities/schemas/communitySchema";
import {requireAuthentication} from "@/lib/auth-server";
import {communityService} from "@/src/features/communities/services/CommunityService";

export async function createCommunityActions(input: CommunityInput) {
    const data = CommunitySchema.safeParse(input);
    if (!data.success) {
        return {
            error: 'Hubo un error',
            success: ''
        }
    }
    const {session} = await requireAuthentication();
    if (!session) {
        return {
            error: 'El usuario no esta autenticado',
            success: ''
        }
    }
    await communityService.createCommunity(data.data, session.user.id);
    return {
        error: '',
        success: 'Comunidad creada correctamente.'
    }
}