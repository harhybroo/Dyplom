import { $api } from "shared/api/api";
import { CreateTradingProps } from "../type/CreatePlacementType";

export const CreateTradingService = async (props: CreateTradingProps) => {
    const {
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
    const response = await $api.post(`/trading`, params);
    return response;
};
