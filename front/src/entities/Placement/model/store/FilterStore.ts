import { create } from "zustand";
import { filterState } from "../types/PlacementType";

export const useFilterStore = create<filterState>((set) => ({
    category: null,
    city: null,
    search: null,
    minPrice: null,
    maxPrice: null,
    minSquare: null,
    maxSquare: null,
    rooms: null,
    ammenities: null,
    changeCategory: (category: string) => {
        set({ category: category });
    },
    changeSearch: (search: string) => {
        set({ search: search });
    },
    changeCity: (city: string) => {
        set({ city: city });
    },
    changeMinPrice: (minPrice: number) => {
        set({ minPrice: minPrice });
    },
    changeMaxPrice: (maxPrice: number) => {
        set({ maxPrice: maxPrice });
    },
    changeMinSquare: (minSquare: number) => {
        set({ minSquare: minSquare });
    },
    changeMaxSquare: (maxSquare: number) => {
        set({ maxSquare: maxSquare });
    },
    changeRooms: (rooms: string[]) => {
        set({ rooms: rooms });
    },
    changeAmmenities: (amm: string[]) => {
        set({ ammenities: amm });
    },
}));
