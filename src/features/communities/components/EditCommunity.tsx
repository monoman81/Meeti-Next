"use client";

import {SelectCommunity} from "@/src/features/communities/types/community.types";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CommunityInput, CommunitySchema} from "@/src/features/communities/schemas/communitySchema";
import CommunityForm from "@/src/features/communities/components/CommunityForm";
import {Form, FormSubmit} from "@/components/forms";
import {editCommunityAction} from "@/src/features/communities/actions/community-actions";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

type EditCommunityProps = {
    community: SelectCommunity
}

export default function EditCommunity({ community }: EditCommunityProps) {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        mode: 'all',
        defaultValues: {
            name: community.name,
            description: community.description,
            image: community.image,
        }
    });

    const onSubmit = async (data: CommunityInput): Promise<void> => {
        const {error, success} = await editCommunityAction(data, community.id);
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success(success);
            redirect('/dashboard/communities');
        }
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <CommunityForm />
                <FormSubmit value={'Guardar Cambios'} />
            </Form>
        </FormProvider>
    )
}
