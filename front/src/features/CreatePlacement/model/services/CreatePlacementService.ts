import { $api } from "shared/api/api";
import { CreatePlacementProps } from "../type/CreatePlacementType";

export const CreatePlacementService = async (props: CreatePlacementProps) => {
    const {
        roomAmmount,
        square,
        living_square,
        ammenities,
        city,
        street,
        house_number,
        apart_number,
        flat,
        flat_total,
        contact_name,
        contact_number,
    } = props;
    const params = {
        roomAmmount: roomAmmount,
        square: square,
        living_square: living_square,
        ammenities: ammenities,
        city: city,
        street: street,
        house_number: house_number,
        apart_number: apart_number,
        flat: flat,
        flat_total: flat_total,
        contact_name: contact_name,
        contact_number: contact_number,
    };
    const response = await $api.post(`/placement`, params);
    return response;
};
