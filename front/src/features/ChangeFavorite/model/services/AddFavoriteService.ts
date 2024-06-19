import { $api } from "shared/api/api";
import { AddFavoriteServiceProps } from "../types/ChangeFavoriteType";

export const AddFavoriteService = async (props: AddFavoriteServiceProps) => {
    const { userId, new_favorite } = props;
    const params = {
        favorite: new_favorite,
    };
    const response = $api.patch(`/users/${userId}`, params);
    return response;
};
