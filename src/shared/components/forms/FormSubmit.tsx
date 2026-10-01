import {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function FormSubmit(props: Props) {
    return (
        <input {...props} type="submit" className="bg-pink-600 w-full p-2 uppercase font-black cursor-pointer text-white mt-5" />
    )
}
