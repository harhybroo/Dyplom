export interface placementState {
    card: Card;
    CardIsLoading: boolean;
    cards: Card[];
    CardsIsLoading: boolean;
    reviewCards: Card[];
    ReviewCardsIsLoading: boolean;
    fetchCard: (id: number) => Promise<void>;
    fetchAllCards: () => Promise<void>;
    fetchReviewCards: () => Promise<void>;
}
export interface filterState {
    category: string;
    search: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    minSquare: number;
    maxSquare: number;
    rooms: string[];
    ammenities: string[];
    changeCategory: (category: string) => void;
    changeCity: (city: string) => void;
    changeSearch: (search: string) => void;
    changeMinPrice: (minPrice: number) => void;
    changeMaxPrice: (maxPrice: number) => void;
    changeMinSquare: (minSquare: number) => void;
    changeMaxSquare: (maxSquare: number) => void;
    changeRooms: (rooms: string[]) => void;
    changeAmmenities: (amm: string[]) => void;
}
export interface Card {
    id: number;
    title: string;
    desc: string;
    price: number;
    status: string;
    placement: null | Placement;
    office: null | Placement;
    garage: null | Placement;
    trading: null | Placement;
    storage: null | Placement;
    img: CardImage[];
}
export interface Placement {
    id: number;
    capacity?: string;
    roomAmmount?: string;
    square?: number;
    living_square?: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number?: number;
    apart_number?: number;
    flat?: number;
    flat_total?: number;
    contact_name: number;
    contact_number: number;
}
export interface CardImage {
    id: number;
    filename: string;
    originalName: string;
    size: 2109;
    deletedAt: null;
}
export interface PreviewCardProps {
    id: number;
    title: string;
    desc: string;
    price: number;
    street: string;
    house_num: number;
    img: ImageCard[];
}
export interface ImageCard {
    id: number;
    filename: string;
    originalName: string;
    size: 2109;
    deletedAt: null;
}
