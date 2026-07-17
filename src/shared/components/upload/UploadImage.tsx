import {twMerge} from "tailwind-merge";
import {UploadDropzone} from "@/shared/utils/uploadthing";
import {useState} from "react";
import Image from "next/image";
import {useFormContext} from "react-hook-form";
import {CommunityInput} from "@/src/features/communities/schemas/communitySchema";
import {FormError} from "@/components/forms";

export default function UploadImage() {

    const {formState: {errors}, setValue} = useFormContext<CommunityInput>()
    const [uploadedImage, setUploadedImage] = useState('');

    return (
        <>
            <UploadDropzone
                endpoint={'meetiUploader'}
                className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
                onClientUploadComplete={(res) => {
                    setUploadedImage(res[0].ufsUrl);
                    setValue('image', res[0].ufsUrl, {shouldValidate: true});
                }}
                appearance={{
                    button: "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0",
                    label: "text-sm text-gray-600 hover:text-gray-900",
                    allowedContent: "text-sm"
                }}
                content={{
                    button: "Selecciona una Imagen",
                    label: "Elige un archiva o arrastralo aqui",
                    allowedContent: "Maximo 1 imagen de 1Mb",
                }}
                config={{
                    cn: twMerge,
                    mode: 'auto'
                }}
            />
            {errors.image && <FormError>{errors.image.message}</FormError>}
            {uploadedImage && (
                <>
                    <p className="text-lg font-bold">Imagen Nueva:</p>
                    <Image src={uploadedImage} alt="Imagen Nueva" width={300} height={300} />
                </>
            )}
        </>
    )
}
