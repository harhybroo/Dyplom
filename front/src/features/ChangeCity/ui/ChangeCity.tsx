import { useEffect, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import styles from "./ChangeCity.module.scss";
import { Modal } from "shared/ui/Modal/Modal";
import { cityDict } from "../model/consts/cityConst";
import { useFilterStore } from "entities/Placement/model/store/FilterStore";

export const ChangeCity = () => {
    const [changeCityOpened, setChangeCityOpened] = useState(false);
    const [currentCity, setCurrentCity] = useState("");
    const changeCity = useFilterStore((state) => state.changeCity);
    const onClickSelectCity = (val: string) => {
        setCurrentCity(val);
        window.localStorage.setItem("city", val);
        changeCity(val);
    };
    useEffect(() => {
        const city = window.localStorage.getItem("city");

        if (city !== null) {
            setCurrentCity(city);
            changeCity(city);
        }
        if (city === null) {
            setCurrentCity("Москва");
            changeCity("Москва");
        }
    }, [changeCity]);

    return (
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.city}
                onClick={() => setChangeCityOpened(!changeCityOpened)}
            >
                <span className={styles.city_name}>{currentCity}</span>
            </Button>
            {changeCityOpened && (
                <Modal
                    isOpen={changeCityOpened}
                    onClose={() => setChangeCityOpened(false)}
                >
                    <ul className={styles.city_list}>
                        {Object.entries(cityDict).map(([letter, cities]) => (
                            <li
                                key={letter}
                                className={styles.city_letter_list}
                            >
                                <p className={styles.city_letter}>{letter}</p>
                                <ul className={styles.city_letter_list}>
                                    {cities.map((city) => (
                                        <li
                                            key={city}
                                            className={`${styles.city} ${
                                                currentCity === city
                                                    ? styles.active
                                                    : ""
                                            }`}
                                        >
                                            <Button
                                                theme={ButtonTheme.CLEAR}
                                                onClick={() =>
                                                    onClickSelectCity(city)
                                                }
                                            >
                                                {city}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}
        </>
    );
};
