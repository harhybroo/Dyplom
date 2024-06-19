import { $api } from "shared/api/api";
import { RemoveFavoriteServiceProps } from "../types/ChangeFavoriteType";

export const RemoveFavoriteService = async (
    props: RemoveFavoriteServiceProps
) => {
    const { userId, new_favorite } = props;
    const params = {
        favorite: new_favorite,
    };
    const response = $api.patch(`/users/${userId}`, params);
    return response;
};
