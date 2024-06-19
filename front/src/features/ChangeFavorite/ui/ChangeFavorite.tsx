import { useState } from "react";
import FavoriteIcon from "shared/assets/icons/favorite.svg?react";
import UnfavoriteIcon from "shared/assets/icons/unfavorite.svg?react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import styles from "./ChangeFavorite.module.scss";
import { ChangeFavoriteProps } from "../model/types/ChangeFavoriteType";
import { useUserStore } from "entities/User";
import { AddFavoriteService } from "../model/services/AddFavoriteService";
import { RemoveFavoriteService } from "../model/services/RemoveFavoriteService";
export const ChangeFavorite = (props: ChangeFavoriteProps) => {
    const { isFavorite, cardId } = props;
    const [hovered, setHovered] = useState(false);
    const user = useUserStore((state) => state.user);
    const fetchUser = useUserStore((state) => state.fetchUser);
    const onClickAddToFavorite = () => {
        const newFavorite = [...user.favorite, cardId.toString()];
        AddFavoriteService({ userId: user.id, new_favorite: newFavorite }).then(
            () => fetchUser()
        );
    };
    const onClickRemoveFromFavorite = () => {
        const newFavorite = user.favorite.filter(
            (item) => item !== cardId.toString()
        );
        RemoveFavoriteService({
            userId: user.id,
            new_favorite: newFavorite,
        }).then(() => fetchUser());
    };
    return (
        <>
            {!isFavorite ? (
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.button}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={onClickAddToFavorite}
                >
                    {hovered ? (
                        <FavoriteIcon className={styles.icon} />
                    ) : (
                        <UnfavoriteIcon className={styles.icon} />
                    )}
                </Button>
            ) : (
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.button}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={onClickRemoveFromFavorite}
                >
                    {hovered ? (
                        <UnfavoriteIcon className={styles.icon} />
                    ) : (
                        <FavoriteIcon className={styles.icon} />
                    )}
                </Button>
            )}
        </>
    );
};
