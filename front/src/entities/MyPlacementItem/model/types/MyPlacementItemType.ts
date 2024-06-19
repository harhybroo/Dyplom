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
    roomAmmount?: number;
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
