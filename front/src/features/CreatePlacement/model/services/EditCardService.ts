import { $api } from "shared/api/api";
import { EditCardProps } from "../type/CreatePlacementType";

export const EditCardService = async (props: EditCardProps) => {
    const { id, placementId, officeId, storageId, tradingId, garageId } = props;
    const params = {
        placement: placementId ? placementId : null,
        office: officeId ? officeId : null,
        storage: storageId ? storageId : null,
        trading: tradingId ? tradingId : null,
        garage: garageId ? garageId : null,
    };
    const response = await $api.patch(`/card/${id}`, params);
    return response;
};
