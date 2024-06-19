import { $api } from "shared/api/api";
import { CreateStorageProps } from "../type/CreatePlacementType";

export const CreateStorageService = async (props: CreateStorageProps) => {
    const {
        square,
        ammenities,
        city,
        street,
        house_number,
        contact_name,
        contact_number,
    } = props;
    const params = {
        square: square,
        ammenities: ammenities,
        city: city,
        street: street,
        house_number: house_number,
        contact_name: contact_name,
        contact_number: contact_number,
    };
    const response = await $api.post(`/storage`, params);
    return response;
};
