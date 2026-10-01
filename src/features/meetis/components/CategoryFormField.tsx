import {FormError, FormLabel, FormSelect} from "@/components/forms";
import {Suspense, use} from "react";
import {SelectCategory} from "@/src/features/meetis/types/meeti.types";
import {useFormContext} from "react-hook-form";
import {MeetiInput} from "@/src/features/meetis/schemas/meetiSchema";

const categoriesPromise = fetch('/api/categories').then(response => response.json());

function CategoryOptions() {
    const {register, formState: {errors}} = useFormContext<MeetiInput>();
    const categories = use<SelectCategory[]>(categoriesPromise);
    return (
        <>
            <FormLabel>Categoria Meeti</FormLabel>
            <FormSelect {...register('categoryId')}>
                <option value="" selected disabled>Selecciona Categoria</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option> )}
            </FormSelect>
            {errors.categoryId && <FormError>{errors.categoryId.message}</FormError>}
        </>
    );
}

export default function CategoryFormField() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryOptions />
        </Suspense>
    )
}
