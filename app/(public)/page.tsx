import type { Metadata } from 'next';
import Hero from "@/components/ui/Hero";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export const metadata: Metadata = {
    title: "Meeti - Inicio",
}

export default async function Home() {



    return (
        <>
            <Hero />
        </>
    );
}
