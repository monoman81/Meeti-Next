"use client"
import {Form, FormSubmit} from "@/components/forms";
import CommunityForm from "@/src/features/communities/components/CommunityForm";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CommunityInput, CommunitySchema} from "@/src/features/communities/schemas/communitySchema";
import {createCommunityActions} from "@/src/features/communities/actions/community-actions";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";

export default function CreateCommunity() {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        mode: 'all',
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const onSubmit = async (data: CommunityInput): Promise<void> => {
        const {error, success} = await createCommunityActions(data);
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
                <FormSubmit value={'Crear Comunidad'} />
            </Form>
        </FormProvider>
    )
}
