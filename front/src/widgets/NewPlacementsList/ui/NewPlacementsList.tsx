import { useEffect } from "react";
import styles from "./NewPlacementsList.module.scss";
import { MyPlacementItem } from "entities/MyPlacementItem";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
import { PageLoader } from "widgets/PageLoader";
import { ApprovePlacement } from "features/ApprovePlacement";
import { DeclinePlacement } from "features/DeclinePlacement";
export const NewPlacementsList = () => {
    const fetchReview = usePlacementStore((state) => state.fetchReviewCards);
    const reviewCards = usePlacementStore((state) => state.reviewCards);
    const reviewIsLoading = usePlacementStore(
        (state) => state.ReviewCardsIsLoading
    );
    useEffect(() => {
        fetchReview();
    }, [fetchReview]);
    console.log(reviewCards);
    if (reviewIsLoading) {
        return <PageLoader />;
    }
    return (
        <div className={styles.myPlacement}>
            <h1>Новые помещения</h1>
            <ul className={styles.list}>
                {reviewCards.map((item, index) => (
                    <li className={styles.item} key={item.id}>
                        <MyPlacementItem
                            id={item.id}
                            status={item.status}
                            title={item.title}
                            desc={item.desc}
                            price={item.price}
                            img={item.img}
                            placement={item.placement}
                            office={item.office}
                            garage={item.garage}
                            storage={item.storage}
                            trading={item.trading}
                        />
                        <ApprovePlacement id={item.id} key={index} />
                        <DeclinePlacement id={item.id} key={item.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
