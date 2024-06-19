import { useEffect, useState } from "react";
import styles from "./PlacementDetails.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
import LocationIcon from "shared/assets/icons/location.svg?react";
import SquareIcon from "shared/assets/icons/square.svg?react";
import StairsIcon from "shared/assets/icons/stairs.svg?react";
import RoomsIcon from "shared/assets/icons/rooms.svg?react";
import WarmIcon from "shared/assets/icons/warm.svg?react";
import WaterIcon from "shared/assets/icons/water.svg?react";
import CCTVIcon from "shared/assets/icons/cctv.svg?react";
import AntennaIcon from "shared/assets/icons/antenna.svg?react";
import DressingIcon from "shared/assets/icons/dressing.svg?react";
import ElecticIcon from "shared/assets/icons/electric.svg?react";
import ParkingIcon from "shared/assets/icons/parking.svg?react";
import RestarauntIcon from "shared/assets/icons/restaraunt.svg?react";
import RestIcon from "shared/assets/icons/rest.svg?react";
import LoadingIcon from "shared/assets/icons/carLoading.svg?react";
import TVIcon from "shared/assets/icons/tv.svg?react";
import FreezerIcon from "shared/assets/icons/freezer.svg?react";
import EthernetIcon from "shared/assets/icons/ethernet.svg?react";
import ConditionerIcon from "shared/assets/icons/conditioner.svg?react";
import WashIcon from "shared/assets/icons/wash.svg?react";
import FurnitureIcon from "shared/assets/icons/furniture.svg?react";
import KitchenFurnitureIcon from "shared/assets/icons/kitchen_furniture.svg?react";
import MeetingIcon from "shared/assets/icons/meeting.svg?react";
import BenchIcon from "shared/assets/icons/bench.svg?react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Modal } from "shared/ui/Modal/Modal";

export const PlacementDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const fetchCard = usePlacementStore((state) => state.fetchCard);
    const isLoading = usePlacementStore((state) => state.CardIsLoading);
    const card = usePlacementStore((state) => state.card);
    const [ready, setReady] = useState(false);
    const [opened, setOpened] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    useEffect(() => {
        fetchCard(parseInt(id));
    }, [fetchCard, id]);
    console.log(card);
    useEffect(() => {
        if (card !== null) {
            card.status !== "approved" ? navigate("/") : setReady(true);
        }
    }, [card, isLoading, navigate]);
    const getCategory = () => {
        if (card.garage !== null) {
            return "garage";
        }
        if (card.placement !== null) {
            return "placement";
        }
        if (card.office !== null) {
            return "office";
        }
        if (card.trading !== null) {
            return "trading";
        }
        if (card.storage !== null) {
            return "storage";
        }
    };
    const allAmenities = [
        { title: "Электричество", icon: <ElecticIcon /> },
        { title: "Водопровод", icon: <WaterIcon /> },
        { title: "Отопление", icon: <WarmIcon /> },
        { title: "Сигнализация", icon: <AntennaIcon /> },
        { title: "Рабочая зона", icon: <BenchIcon /> },
        { title: "Видеонаблюдение", icon: <CCTVIcon /> },
        { title: "Гардероб", icon: <DressingIcon /> },
        { title: "Кухня", icon: <FreezerIcon /> },
        { title: "Интернет", icon: <EthernetIcon /> },
        { title: "Зона отдыха", icon: <RestIcon /> },
        { title: "Переговорная", icon: <MeetingIcon /> },
        { title: "Телевизор", icon: <TVIcon /> },
        { title: "Холодильник", icon: <FreezerIcon /> },
        { title: "Кондиционер", icon: <ConditionerIcon /> },
        { title: "Стиральная машина", icon: <WashIcon /> },
        { title: "Посудомоечная машина", icon: <WashIcon /> },
        { title: "Кухонная мебель", icon: <KitchenFurnitureIcon /> },
        { title: "Комнатная мебель", icon: <FurnitureIcon /> },
        { title: "Раздевалка", icon: <DressingIcon /> },
        { title: "Столовая", icon: <RestarauntIcon /> },
        { title: "Помещение для отдыха", icon: <RestIcon /> },
        { title: "Парковка", icon: <ParkingIcon /> },
        { title: "Погрузочные зоны", icon: <LoadingIcon /> },
    ];
    if (ready) {
        return (
            <div className={styles.details}>
                <h1 className={styles.title}>Информация о помещении</h1>
                <div className={styles.placement}>
                    <div className={styles.top}>
                        <img
                            className={styles.image}
                            src={`http://localhost:7777/uploads/${card.img[0].filename}`}
                        />
                        <div className={styles.info}>
                            <p className={styles.info_title}>{card.title}</p>
                            <span className={styles.info_desc}>
                                {card.desc}
                            </span>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.info}>
                            <div className={styles.square_total}>
                                <p>Общая площадь</p>
                                <div className={styles.address}>
                                    <SquareIcon
                                        className={styles.icon}
                                        style={{ rotate: "45deg" }}
                                    />
                                    {getCategory() === "office" && (
                                        <span>{card.office.square} м2</span>
                                    )}
                                    {getCategory() === "garage" && (
                                        <span>{card.garage.square} м2</span>
                                    )}

                                    {getCategory() === "placement" && (
                                        <span>{card.placement.square} м2</span>
                                    )}

                                    {getCategory() === "storage" && (
                                        <span>{card.storage.square} м2</span>
                                    )}

                                    {getCategory() === "trading" && (
                                        <span>{card.trading.square} м2</span>
                                    )}
                                </div>
                            </div>
                            {getCategory() === "placement" && (
                                <div className={styles.square_living}>
                                    <p>Жилая площадь</p>
                                    <div className={styles.address}>
                                        <SquareIcon
                                            className={styles.icon}
                                            style={{ rotate: "45deg" }}
                                        />
                                        {getCategory() === "placement" && (
                                            <span>
                                                {card.placement.living_square}{" "}
                                                м2
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                            {(getCategory() === "placement" ||
                                getCategory() === "office" ||
                                getCategory() === "trading") && (
                                <div className={styles.flat_block}>
                                    <p>Этаж</p>
                                    <div className={styles.flat}>
                                        <StairsIcon className={styles.icon} />
                                        {getCategory() === "placement" && (
                                            <>
                                                <span className={styles.flat}>
                                                    {card.placement.flat}
                                                </span>
                                                из
                                                <span
                                                    className={
                                                        styles.flat_total
                                                    }
                                                >
                                                    {card.placement.flat_total}
                                                </span>
                                            </>
                                        )}
                                        {getCategory() === "office" && (
                                            <>
                                                <span className={styles.flat}>
                                                    {card.office.flat}
                                                </span>
                                                из
                                                <span
                                                    className={
                                                        styles.flat_total
                                                    }
                                                >
                                                    {card.office.flat_total}
                                                </span>
                                            </>
                                        )}
                                        {getCategory() === "trading" && (
                                            <>
                                                <span className={styles.flat}>
                                                    {card.trading.flat}
                                                </span>
                                                из
                                                <span
                                                    className={
                                                        styles.flat_total
                                                    }
                                                >
                                                    {card.trading.flat_total}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            {getCategory() === ("placement" || "office") && (
                                <div className={styles.rooms}>
                                    <p>Количество помещений</p>
                                    <div className={styles.room}>
                                        <RoomsIcon className={styles.icon} />
                                        {getCategory() === "placement" && (
                                            <span>
                                                {card.placement.roomAmmount}
                                            </span>
                                        )}
                                        {getCategory() === "office" && (
                                            <span>
                                                {card.office.roomAmmount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className={styles.address_block}>
                                <p>Расположение</p>
                                <div className={styles.address}>
                                    <LocationIcon className={styles.icon} />
                                    {getCategory() === "office" && (
                                        <span>
                                            {card.office.city},
                                            {card.office.street},
                                            {card.office.house_number}
                                        </span>
                                    )}
                                    {getCategory() === "garage" && (
                                        <span>
                                            {card.garage.city},
                                            {card.garage.street},
                                            {card.garage.house_number}
                                        </span>
                                    )}

                                    {getCategory() === "placement" && (
                                        <a
                                        href={`https://yandex.ru/maps/?text=${card.placement.city},${card.placement.street},${card.placement.house_number}                   
                                    }`}
                                    >
                                        {card.placement.city},
                                        {card.placement.street},
                                        {card.placement.house_number}
                                    </a>
                                    )}

                                    {getCategory() === "storage" && (
                                        <span>
                                            {card.storage.city},
                                            {card.storage.street},
                                            {card.storage.house_number}
                                        </span>
                                    )}

                                    {getCategory() === "trading" && (
                                        <span>
                                            {card.trading.city},
                                            {card.trading.street},
                                            {card.trading.house_number}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.ammenities_block}>
                            Удобства помещения:
                            <ul className={styles.ammenities}>
                                {getCategory() === "office" &&
                                    allAmenities
                                        .filter((amenity) =>
                                            card.office.ammenities.includes(
                                                amenity.title
                                            )
                                        )
                                        .map((item) => (
                                            <li className={styles.ammenity}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </li>
                                        ))}

                                {getCategory() === "garage" &&
                                    allAmenities
                                        .filter((amenity) =>
                                            card.garage.ammenities.includes(
                                                amenity.title
                                            )
                                        )
                                        .map((item) => (
                                            <li className={styles.ammenity}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </li>
                                        ))}
                                {getCategory() === "placement" &&
                                    allAmenities
                                        .filter((amenity) =>
                                            card.placement.ammenities.includes(
                                                amenity.title
                                            )
                                        )
                                        .map((item) => (
                                            <li className={styles.ammenity}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </li>
                                        ))}
                                {getCategory() === "storage" &&
                                    allAmenities
                                        .filter((amenity) =>
                                            card.storage.ammenities.includes(
                                                amenity.title
                                            )
                                        )
                                        .map((item) => (
                                            <li className={styles.ammenity}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </li>
                                        ))}
                                {getCategory() === "trading" &&
                                    allAmenities
                                        .filter((amenity) =>
                                            card.trading.ammenities.includes(
                                                amenity.title
                                            )
                                        )
                                        .map((item) => (
                                            <li className={styles.ammenity}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </li>
                                        ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.image_block}>
                            <p>Фотографии</p>
                            <ul className={styles.image_block_list}>
                                {card !== null &&
                                    card.img.map(
                                        (image, index) =>
                                            index !== 0 && (
                                                <li>
                                                    <Button
                                                        theme={
                                                            ButtonTheme.CLEAR
                                                        }
                                                        className={
                                                            styles.image_block_img
                                                        }
                                                        onClick={() => {
                                                            setImgUrl(
                                                                image.filename
                                                            );
                                                            setOpened(true);
                                                        }}
                                                    >
                                                        <img
                                                            src={`http://localhost:7777/uploads/${image.filename}`}
                                                            alt=""
                                                        />
                                                    </Button>
                                                </li>
                                            )
                                    )}
                            </ul>
                        </div>
                        <div className={styles.contact}>
                            <div className={styles.contact_name}>
                                <p>Имя</p>
                                <span>
                                    {getCategory() === "office" && (
                                        <>
                                            <span>
                                                {card.office.contact_name}
                                            </span>
                                        </>
                                    )}
                                    {getCategory() === "garage" && (
                                        <>
                                            <span>
                                                {card.garage.contact_name}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "placement" && (
                                        <>
                                            <span>
                                                {card.placement.contact_name}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "storage" && (
                                        <>
                                            <span>
                                                {card.storage.contact_name}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "trading" && (
                                        <>
                                            <span>
                                                {card.trading.contact_name}
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className={styles.contact_name}>
                                <p>Телефон</p>
                                <span>
                                    {getCategory() === "office" && (
                                        <>
                                            <span>
                                                {card.office.contact_number}
                                            </span>
                                        </>
                                    )}
                                    {getCategory() === "garage" && (
                                        <>
                                            <span>
                                                {card.garage.contact_number}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "placement" && (
                                        <>
                                            <span>
                                                {card.placement.contact_number}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "storage" && (
                                        <>
                                            <span>
                                                {card.storage.contact_number}
                                            </span>
                                        </>
                                    )}

                                    {getCategory() === "trading" && (
                                        <>
                                            <span>
                                                {card.trading.contact_number}
                                            </span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className={styles.contact_price}>
                                <p>Цена</p>
                                <span>{card.price}₽/месяц</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={opened} onClose={() => setOpened(false)}>
                    <div className={styles.fullPhoto}>
                        <img
                            src={`http://localhost:7777/uploads/${imgUrl}`}
                            alt=""
                        />
                    </div>
                </Modal>
            </div>
        );
    }
};
