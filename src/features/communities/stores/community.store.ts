import {create} from 'zustand';
import {SelectCommunity} from "@/src/features/communities/types/community.types";

type Store = {
    open: boolean,
    setOpen: (open: boolean) => void,
    community: SelectCommunity | null,
    setCommunity: (community: SelectCommunity | null) => void,
}

export const useCommunityStore = create<Store>((set) => ({
    open: false,
    setOpen: (open) => {
        set({open});
    },
    community: null,
    setCommunity: (community: SelectCommunity | null) => {
        set({community});
    }
}));