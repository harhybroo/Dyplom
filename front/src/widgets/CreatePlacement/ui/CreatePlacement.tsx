import Dropdown from "shared/ui/Dropdown/Dropdown";
import styles from "./CreatePlacement.module.scss";
import { useState } from "react";
import {
    GarageForm,
    OfficeForm,
    PlacementForm,
    StorageForm,
    TradingForm,
} from "features/CreatePlacement";

export const CreatePlacement = () => {
    const [type, setType] = useState("");
    const list = ["Квартира", "Гараж", "Склад", "Офис", "Торговое"];
    return (
        <div className={styles.form}>
            <h3>Опишите ваше помещение</h3>

            <div className={styles.placement_type}>
                <p>Тип помещения</p>
                <Dropdown
                    list={list}
                    value={type}
                    onSelect={(val) => setType(val)}
                />
            </div>
            {type === "Квартира" && <PlacementForm />}
            {type === "Гараж" && <GarageForm />}
            {type === "Склад" && <StorageForm />}
            {type === "Офис" && <OfficeForm />}
            {type === "Торговое" && <TradingForm />}
        </div>
    );
};
