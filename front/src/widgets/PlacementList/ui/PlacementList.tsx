import styles from "./PlacementList.module.scss";
import {
    PlacementApartment,
    PlacementGarage,
    PlacementOffice,
    PlacementStorage,
    PlacementTrading,
} from "entities/Placement";
import { useFilterStore } from "entities/Placement/model/store/FilterStore";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
import { useUserStore } from "entities/User";
import { PageLoader } from "widgets/PageLoader";
export const PlacementList = () => {
    const user = useUserStore((state) => state.user);
    const cards = usePlacementStore((state) => state.cards);
    const cardsIsLoading = usePlacementStore((state) => state.CardsIsLoading);
    const category = useFilterStore((state) => state.category);
    const city = useFilterStore((state) => state.city);
    const minPrice = useFilterStore((state) => state.minPrice);
    const maxPrice = useFilterStore((state) => state.maxPrice);
    const minSquare = useFilterStore((state) => state.minSquare);
    const maxSquare = useFilterStore((state) => state.maxSquare);
    const search = useFilterStore((state) => state.search);
    const rooms = useFilterStore((state) => state.rooms);
    const amm = useFilterStore((state) => state.ammenities);

    console.log(user);
    const CardsByCategory = () => {
        if (cards !== null && category === "garage") {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) &&
                    card.garage !== null &&
                    card.garage.city === city &&
                    card.price > minPrice &&
                    card.price < maxPrice &&
                    card.garage.square > minSquare &&
                    card.garage.square < maxSquare
            );
        }
        if (cards !== null && category === "placement") {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) &&
                    card.placement !== null &&
                    card.placement.city === city &&
                    card.price > minPrice &&
                    card.price < maxPrice &&
                    rooms.includes(card.placement.roomAmmount) &&
                    amm.some((element) =>
                        card.placement.ammenities.includes(element)
                    )
            );
        }
        if (cards !== null && category === "office") {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) &&
                    card.office !== null &&
                    card.office.city === city &&
                    card.price > minPrice &&
                    card.price < maxPrice &&
                    card.office.square > minSquare &&
                    card.office.square < maxSquare &&
                    amm.some((element) =>
                        card.office.ammenities.includes(element)
                    )
            );
        }
        if (cards !== null && category === "storage") {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) &&
                    card.storage !== null &&
                    card.storage.city === city &&
                    card.price > minPrice &&
                    card.price < maxPrice &&
                    card.storage.square > minSquare &&
                    card.storage.square < maxSquare &&
                    amm.some((element) =>
                        card.storage.ammenities.includes(element)
                    )
            );
        }
        if (cards !== null && category === "trading") {
            return cards.filter(
                (card) =>
                    card.title.toLowerCase().includes(search.toLowerCase()) &&
                    card.trading !== null &&
                    card.trading.city === city &&
                    card.price > minPrice &&
                    card.price < maxPrice &&
                    card.trading.square > minSquare &&
                    card.trading.square < maxSquare &&
                    amm.some((element) =>
                        card.trading.ammenities.includes(element)
                    )
            );
        }
        if (cards !== null && category === "favorite") {
            return cards.filter(
                (card) =>
                    user.favorite.includes(card.id.toString()) &&
                    card.title.toLowerCase().includes(search.toLowerCase())
            );
        }
    };
    CardsByCategory();
    if (cardsIsLoading) {
        return <PageLoader />;
    }
    return (
        <div className={styles.placement_list}>
            {category === "garage" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <PlacementGarage
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        street={item.garage.street}
                        house_num={item.garage.house_number}
                        img={item.img}
                    />
                ))}
            {category === "placement" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <PlacementApartment
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        street={item.placement.street}
                        house_num={item.placement.house_number}
                        img={item.img}
                    />
                ))}
            {category === "storage" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <PlacementStorage
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        street={item.storage.street}
                        house_num={item.storage.house_number}
                        img={item.img}
                    />
                ))}
            {category === "office" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <PlacementOffice
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        street={item.office.street}
                        house_num={item.office.house_number}
                        img={item.img}
                    />
                ))}
            {category === "trading" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <PlacementTrading
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        price={item.price}
                        street={item.trading.street}
                        house_num={item.trading.house_number}
                        img={item.img}
                    />
                ))}
            {category === "favorite" &&
                cards !== null &&
                CardsByCategory().map((item) => (
                    <div className={styles.favorite} key={item.id}>
                        {item.placement !== null && (
                            <PlacementApartment
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                price={item.price}
                                street={item.placement.street}
                                house_num={item.placement.house_number}
                                img={item.img}
                            />
                        )}
                        {item.office !== null && (
                            <PlacementOffice
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                price={item.price}
                                street={item.office.street}
                                house_num={item.office.house_number}
                                img={item.img}
                            />
                        )}
                        {item.garage !== null && (
                            <PlacementGarage
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                price={item.price}
                                street={item.garage.street}
                                house_num={item.garage.house_number}
                                img={item.img}
                            />
                        )}
                        {item.trading !== null && (
                            <PlacementTrading
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                price={item.price}
                                street={item.trading.street}
                                house_num={item.trading.house_number}
                                img={item.img}
                            />
                        )}
                        {item.storage !== null && (
                            <PlacementStorage
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                price={item.price}
                                street={item.storage.street}
                                house_num={item.storage.house_number}
                                img={item.img}
                            />
                        )}
                    </div>
                ))}
        </div>
    );
};
