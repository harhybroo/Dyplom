import { create } from "zustand";

import { $api } from "shared/api/api";
import { placementState } from "../types/PlacementType";

export const usePlacementStore = create<placementState>((set) => ({
    card: null,
    CardIsLoading: true,
    cards: null,
    CardsIsLoading: true,
    reviewCards: null,
    ReviewCardsIsLoading: true,
    fetchCard: async (id: number) => {
        try {
            const { data } = await $api.get(`/card/${id}`);
            set({ card: data });
            set({ CardIsLoading: false });
        } catch (err) {
            set({ card: null });
            set({ CardIsLoading: false });
        }
    },
    fetchAllCards: async () => {
        try {
            const { data } = await $api.get(`/card`);
            set({ cards: data });
            set({ CardsIsLoading: false });
        } catch (err) {
            set({ cards: null });
            set({ CardsIsLoading: false });
        }
    },
    fetchReviewCards: async () => {
        try {
            const { data } = await $api.get(`/card/review`);
            set({ reviewCards: data });
            set({ ReviewCardsIsLoading: false });
        } catch (err) {
            set({ reviewCards: null });
            set({ ReviewCardsIsLoading: false });
        }
    },
}));
