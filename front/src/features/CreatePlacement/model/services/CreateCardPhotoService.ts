import { $api } from "shared/api/api";
import { CreateCardPhotoProps } from "../type/CreatePlacementType";

export const CreateCardPhotoService = async (props: CreateCardPhotoProps) => {
    const { image, id } = props;
    const params = {
        file: image,
    };
    const response = await $api.post(`files/${id}`, params, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};
