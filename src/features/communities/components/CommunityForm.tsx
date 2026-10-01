import {FormError, FormInput, FormLabel, FormTextarea} from "@/components/forms";
import {useFormContext} from "react-hook-form";
import {CommunityInput} from "@/src/features/communities/schemas/communitySchema";
import {useState} from "react";
import UploadImage from "@/components/upload/UploadImage";

export default function CommunityForm() {

    const {register, formState: {errors}} = useFormContext<CommunityInput>();
    return (
        <>
            <FormLabel htmlFor="name">Nombre Comunidad</FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder='Titulo Comunidad'
                {...register('name')}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <FormLabel>Imagen Comunidad</FormLabel>
            <UploadImage />

            <FormLabel htmlFor="description">Descripción Comunidad</FormLabel>
            <FormTextarea
                id="description"
                placeholder='Descripción Comunidad'
                {...register('description')}
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
        </>
    )
}
