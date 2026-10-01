"use client"

import {Form, FormSubmit} from "@/components/forms";
import MeetiForm from "@/src/features/meetis/components/MeetiForm";
import {useSession} from "@/lib/auth-client";
import {MeetiFormValues, MeetiInput, MeetiSchema} from "@/src/features/meetis/schemas/meetiSchema";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export default function CreateMeeti() {
    const methods = useForm<MeetiFormValues>({
        resolver: zodResolver(MeetiSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            details: '',
            categoryId: '',
            communityId: '',
            availableSeats: 0,
            date: '',
            time: '',
            image: '',
            virtual: false,
            location: {
                placeName: '',
                address: '',
                city: '',
                country: '',
                lat: 21.02674952383987,
                lng: -89.62454947020134
            }
        }
    });
    /*
    const onSubmit: SubmitHandler<MeetiFormValues> = (data) => {
  // en runtime, data.availableSeats ya es number (post-coerción)
  // pero si necesitas el tipo validado/output explícitamente:
  const parsed: MeetiInput = MeetiSchema.parse(data)
}
    * */
    const {isPending} = useSession();
    if (isPending) return'Cargado...'
    return (
        <FormProvider {...methods}>
            <Form>
                <MeetiForm />
                <FormSubmit value={'Crear Meeti'} />
            </Form>
        </FormProvider>
    )
}
