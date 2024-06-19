import { $api } from "shared/api/api";
interface ServiceProps {
    id: number;
}
export const ApprovePlacementService = async (props: ServiceProps) => {
    const { id } = props;
    const params = {
        status: "approved",
    };
    const response = await $api.patch(`/card/${id}`, params);
    return response;
};
