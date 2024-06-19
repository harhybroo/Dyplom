import { $api } from "shared/api/api";
import { CreateOfficeProps } from "../type/CreatePlacementType";

export const CreateOfficeService = async (props: CreateOfficeProps) => {
    const {
        roomAmmount,
        square,
        ammenities,
        city,
        street,
        house_number,
        flat,
        flat_total,
        contact_name,
        contact_number,
    } = props;
    const params = {
        roomAmmount: roomAmmount,
        square: square,
        ammenities: ammenities,
        city: city,
        street: street,
        house_number: house_number,
        flat: flat,
        flat_total: flat_total,
        contact_name: contact_name,
        contact_number: contact_number,
    };
    const response = await $api.post(`/office`, params);
    return response;
};
