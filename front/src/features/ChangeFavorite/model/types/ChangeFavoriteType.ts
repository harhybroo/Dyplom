export interface ChangeFavoriteProps {
    isFavorite: boolean;
    cardId: number;
}
export interface AddFavoriteServiceProps {
    userId: number;
    new_favorite: string[];
}
export interface RemoveFavoriteServiceProps {
    userId: number;
    new_favorite: string[];
}
