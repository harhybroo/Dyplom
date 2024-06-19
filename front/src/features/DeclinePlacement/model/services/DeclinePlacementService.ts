import { $api } from "shared/api/api";
interface ServiceProps {
    id: number;
}
export const DeclinePlacementService = async (props: ServiceProps) => {
    const { id } = props;
    const params = {
        status: "declined",
    };
    const response = await $api.patch(`/card/${id}`, params);
    return response;
};
