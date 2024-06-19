import styles from "../Placement.module.scss";
import LocationIcon from "shared/assets/icons/location.svg?react";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { PreviewCardProps } from "entities/Placement/model/types/PlacementType";
import { useUserStore } from "entities/User";
import { ChangeFavorite } from "features/ChangeFavorite";

export const PlacementGarage = (props: PreviewCardProps) => {
    const { title, desc, price, street, house_num, img, id } = props;
    const user = useUserStore((state) => state.user);

    return (
        <AppLink
            to={`/view/${id}`}
            theme={AppLinkTheme.PLACEMENT}
            className={styles.placement}
        >
            <img
                src={`http://localhost:7777/uploads/${img[0].filename}`}
                alt=""
                className={styles.placement_icon}
            />
            <div className={styles.placement_right}>
                <div className={styles.info}>
                    <p className={styles.info_title}>
                        {title.length > 14 ? `${title.slice(0, 14)}...` : title}
                    </p>
                    <span className={styles.info_desc}>{desc}</span>
                </div>
                <div className={styles.features}>
                    <div className={styles.location}>
                        <LocationIcon className={styles.icon} />

                        <span className={styles.text}>
                            {street},{house_num}
                        </span>
                    </div>
                    <div className={styles.features_list}></div>
                </div>
                <div className={styles.bottom}>
                    <span className={styles.bottom_price}>{price}₽/месяц</span>
                    <span className={styles.bottom_type}>Гараж</span>
                </div>
            </div>
            {user !== null && (
                <div onClick={(e) => e.preventDefault()}>
                    <ChangeFavorite
                        cardId={id}
                        isFavorite={user.favorite.includes(id.toString())}
                    />
                </div>
            )}
        </AppLink>
    );
};
