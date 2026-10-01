import {FormError, FormInput, FormLabel, FormTextarea, FormToggle} from "@/shared/components/forms";
import CommunityFormField from "@/src/features/meetis/components/CommunityFormField";
import CategoryFormField from "@/src/features/meetis/components/CategoryFormField";
import dynamic from "next/dynamic";
import {MeetiInput} from "@/src/features/meetis/schemas/meetiSchema";
import {useFormContext} from "react-hook-form";

const DynamicLocationPicker = dynamic(() => import('./LocationPicker'), {ssr: false});

export default function MeetiForm() {
    const {register, watch, formState: {errors}, setValue} = useFormContext<MeetiInput>();
    const isVirtual = watch('virtual');

    return (
        <>
            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">Detalles Meeti</legend>

                <FormLabel htmlFor="title">Nombre Meeti</FormLabel>
                <FormInput
                    id="title"
                    type="text"
                    placeholder="Titulo Meeti"
                    {...register('title')}
                />
                {errors.title && <FormError>{errors.title.message}</FormError>}
                <FormLabel htmlFor="details">Detalles Meeti</FormLabel>
                <FormTextarea
                    id="details"
                    placeholder="Descripción Meeti"
                    {...register('details')}
                />
                {errors.details && <FormError>{errors.details.message}</FormError>}

                <CategoryFormField />

                <CommunityFormField />

                <FormLabel htmlFor="availableSeats">Cupo</FormLabel>
                <FormInput
                    type="number"
                    min={1}
                    id="availableSeats"
                    placeholder="Cupo Disponible"
                    {...register('availableSeats')}
                />
                {errors.availableSeats && <FormError>{errors.availableSeats.message}</FormError>}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <FormLabel htmlFor="date">Fecha:</FormLabel>
                        <FormInput
                            type="date"
                            id="date"
                            {...register('date')}
                        />
                    </div>
                    {errors.date && <FormError>{errors.date.message}</FormError>}
                    <div className="space-y-3">
                        <FormLabel htmlFor="time">Hora:</FormLabel>
                        <FormInput
                            type="time"
                            step={1800}
                            id="time"
                            {...register('time')}
                        />
                    </div>
                    {errors.time && <FormError>{errors.time.message}</FormError>}
                </div>

                <FormLabel htmlFor="virtual">¿Evento Virtual?</FormLabel>
                <FormToggle checked={isVirtual} onChange={(e) => {
                    setValue('virtual', e.target.checked);
                }} />
            </fieldset>

            {!isVirtual && (
                <fieldset className="space-y-3">
                    <legend className="font-black text-4xl mb-5">
                        Ubicación Meeti
                    </legend>

                    <FormLabel id="place_name">Nombre Lugar:</FormLabel>
                    <FormInput
                        id="place_name"
                        type="text"
                        placeholder="Nombre Lugar evento"
                    />
                    <DynamicLocationPicker />
                </fieldset>
            )}
        </>
    )
}