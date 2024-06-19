import React from "react";
import styles from "./MyPlacementItem.module.scss";
import { Card } from "../model/types/MyPlacementItemType";
import LocationIcon from "shared/assets/icons/location.svg?react";

export const MyPlacementItem = (props: Card) => {
    const {
        title,
        desc,
        placement,
        office,
        trading,
        garage,
        storage,
        status,
        price,
        img,
    } = props;

    const getCategory = () => {
        if (garage !== null) {
            return "garage";
        }
        if (placement !== null) {
            return "placement";
        }
        if (office !== null) {
            return "office";
        }
        if (trading !== null) {
            return "trading";
        }
        if (storage !== null) {
            return "storage";
        }
    };
    const getCategoryRus = () => {
        if (garage !== null) {
            return "Гараж";
        }
        if (placement !== null) {
            return "Квартира";
        }
        if (office !== null) {
            return "Офис";
        }
        if (trading !== null) {
            return "Торговое";
        }
        if (storage !== null) {
            return "Склад";
        }
    };
    return (
        <div className={styles.item}>
            <div className={styles.item_left}>
                <img
                    src={`http://localhost:7777/uploads/${img[0].filename}`}
                    alt=""
                    className={styles.image}
                />
                <div className={styles.info}>
                    <div className={styles.upper}>
                        <p className={styles.title}>{title}</p>
                        <span className={styles.desc}>{desc}</span>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.address}>
                            <LocationIcon className={styles.icon} />
                            {getCategory() === "office" && (
                                <span>
                                    {office.city},{office.street},
                                    {office.house_number}
                                </span>
                            )}
                            {getCategory() === "garage" && (
                                <span>
                                    {garage.city},{garage.street},
                                    {garage.house_number}
                                </span>
                            )}

                            {getCategory() === "placement" && (
                                <span>
                                    {placement.city},{placement.street},
                                    {placement.house_number}
                                </span>
                            )}

                            {getCategory() === "storage" && (
                                <span>
                                    {storage.city},{storage.street},
                                    {storage.house_number}
                                </span>
                            )}

                            {getCategory() === "trading" && (
                                <span>
                                    {trading.city},{trading.street},
                                    {trading.house_number}
                                </span>
                            )}
                        </div>
                        <span
                            className={`${styles.status} ${
                                status === "approved" ? styles.approved : ""
                            }`}
                        >
                            {status === "approved"
                                ? "Размещено"
                                : "На проверке..."}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.item_right}>
                <div className={styles.contact}>
                    <p className={styles.contact_name}>
                        {getCategory() === "office" && office.contact_name}
                        {getCategory() === "garage" && garage.contact_name}
                        {getCategory() === "placement" &&
                            placement.contact_name}
                        {getCategory() === "storage" && storage.contact_name}

                        {getCategory() === "trading" && trading.contact_name}
                    </p>
                    <span className={styles.contact_phone}>
                        {getCategory() === "office" && office.contact_number}
                        {getCategory() === "garage" && garage.contact_number}
                        {getCategory() === "placement" &&
                            placement.contact_number}
                        {getCategory() === "storage" && storage.contact_number}

                        {getCategory() === "trading" && trading.contact_number}
                    </span>
                </div>
                <div className={styles.price}>
                    <span className={styles.price}>
                        {getCategoryRus()}, {price}₽/мес.
                    </span>
                </div>
            </div>
        </div>
    );
};
