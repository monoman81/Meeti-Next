"use server"
import {CommunityInput, CommunitySchema} from "@/src/features/communities/schemas/communitySchema";
import {requireAuthentication} from "@/lib/auth-server";
import {communityService} from "@/src/features/communities/services/CommunityService";
import {CheckPasswordInput, CheckPasswordSchema} from "@/src/features/auth/schemas/authSchema";

export async function createCommunityAction(input: CommunityInput) {
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

export async function editCommunityAction(input: CommunityInput, communityId: string) {
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
    await communityService.updateCommunity(data.data, communityId, session.user);
    return {
        error: '',
        success: 'Comunidad guardada correctamente.'
    }
}

export async function deleteCommunityAction(input: CheckPasswordInput, communityId: string) {
    const data = CheckPasswordSchema.safeParse(input);
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
    return await communityService.deleteCommunity(communityId, data.data.password, session.user);
}