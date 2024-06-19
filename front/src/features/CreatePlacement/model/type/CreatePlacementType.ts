export interface CreateCardProps {
    title: string;
    desc: string;
    price: number;
    status: string;
}
export interface EditCardProps {
    id: number;
    placementId?: number;
    officeId?: number;
    garageId?: number;
    storageId?: number;
    tradingId?: number;
}
export interface CreatePlacementProps {
    roomAmmount: string;
    square: number;
    living_square: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number: number;
    apart_number: number;
    flat: number;
    flat_total: number;
    contact_name: string;
    contact_number: string;
}
export interface CreateGarageProps {
    square: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number: number;
    contact_name: string;
    contact_number: string;
}
export interface CreateOfficeProps {
    roomAmmount: string;
    square: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number: number;
    flat: number;
    flat_total: number;
    contact_name: string;
    contact_number: string;
}
export interface CreateStorageProps {
    square: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number: number;
    contact_name: string;
    contact_number: string;
}
export interface CreateTradingProps {
    square: number;
    ammenities: string[];
    city: string;
    street: string;
    house_number: number;
    flat: number;
    flat_total: number;
    contact_name: string;
    contact_number: string;
}
export interface CreateCardPhotoProps {
    id: number;
    image: unknown;
}
export interface SetCardMainPhotoProps {
    id: number;
    imageId: number;
}
