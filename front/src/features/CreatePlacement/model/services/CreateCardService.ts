import { $api } from "shared/api/api";
import { CreateCardProps } from "../type/CreatePlacementType";

export const CreateCardService = async (props: CreateCardProps) => {
    const { title, desc, price, status } = props;
    const params = {
        title: title,
        desc: desc,
        price: price,
        status: status,
    };
    const response = await $api.post(`/card`, params);
    return response;
};
