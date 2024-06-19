import { useCallback, useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import "./slider.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import {
    avalaibleCategories,
    avalaibleRooms,
} from "../model/consts/categoriesList";
import Slider from "rc-slider";
import Input, { InputTheme } from "shared/ui/Input/Input";
import {
    reverseTranslateCategory,
    translateCategory,
} from "../model/lib/TransalteCategory";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
import { useFilterStore } from "entities/Placement/model/store/FilterStore";
import { Checkbox } from "shared/ui/Checkbox/Checkbox";
import {
    GarageAmm,
    OfficeAmm,
    PlacementAmm,
    StorageAmm,
    TradingAmm,
} from "../model/consts/AmmenitiesList";
export const Filter = () => {
    const [categoryList, setCategoryList] = useState("Квартиры");
    const [rooms, setRooms] = useState(["6+", "5", "4", "3", "2", "1"]);
    const [amm, setAmm] = useState([
        "Телевизор",
        "Холодильник",
        "Интернет",
        "Кондиционер",
        "Стиральная машина",
        "Посудомоечная машина",
        "Кухонная мебель",
        "Комнатная мебель",
        "Электричество",
        "Водопровод",
        "Отопление",
        "Сигнализация",
        "Рабочая зона",
        "Видеонаблюдение",
        "Гардероб",
        "Кухня",
        "Зона отдыха",
        "Переговорная",
        "Видеонаблюдение",
        "Раздевалка",
        "Столовая",
        "Помещение для отдыха",
        "Парковка",
        "Погрузочные зоны",
        "Гардероб",
        "Водопровод",
        "Сигнализация",
        "Отопление",
    ]);
    const MIN_price = 100;
    const MAX_price = 1000000;
    const MIN_square = 10;
    const MAX_square = 1000;
    const [priceValues, setPriceValues] = useState([MIN_price, MAX_price]);
    const [squareValues, setSquaresValues] = useState([MIN_square, MAX_square]);
    const changeCategory = useFilterStore((state) => state.changeCategory);
    const changeMinPrice = useFilterStore((state) => state.changeMinPrice);
    const changeMaxPrice = useFilterStore((state) => state.changeMaxPrice);
    const changeMinSquare = useFilterStore((state) => state.changeMinSquare);
    const changeMaxSquare = useFilterStore((state) => state.changeMaxSquare);
    const changeRooms = useFilterStore((state) => state.changeRooms);
    const changeAmm = useFilterStore((state) => state.changeAmmenities);

    const fetchCards = usePlacementStore((state) => state.fetchAllCards);
    const onSliderChange = (values, label: string) => {
        if (label === "price") {
            setPriceValues([values[0], values[1]]);
        }
        if (label === "square") {
            setSquaresValues([values[0], values[1]]);
        }
    };
    const onInputChange = (type: string, value, label: string) => {
        if (label === "price") {
            if (type === "min") {
                if (parseInt(value) >= MIN_price) {
                    setPriceValues((prev) => [parseInt(value), prev[1]]);
                } else {
                    setPriceValues((prev) => [MIN_price, prev[1]]);
                }
            }
            if (type === "max") {
                if (parseInt(value) >= MIN_price) {
                    setPriceValues((prev) => [prev[0], parseInt(value)]);
                } else {
                    setPriceValues((prev) => [prev[0], MIN_price]);
                }
            }
        }
        if (label === "square") {
            if (type === "min") {
                if (parseInt(value) >= MIN_square) {
                    setSquaresValues((prev) => [parseInt(value), prev[1]]);
                } else {
                    setSquaresValues((prev) => [MIN_square, prev[1]]);
                }
            }
            if (type === "max") {
                if (parseInt(value) >= MIN_square) {
                    setSquaresValues((prev) => [prev[0], parseInt(value)]);
                } else {
                    setSquaresValues((prev) => [prev[0], MIN_square]);
                }
            }
        }
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get("category") || "placement";
        const minPrice =
            parseInt(params.get("minPrice")) >= MIN_price
                ? parseInt(params.get("minPrice"))
                : MIN_price || MIN_price;
        const maxPrice =
            parseInt(params.get("maxPrice")) >= MIN_price
                ? parseInt(params.get("maxPrice"))
                : MAX_price || MAX_price;
        const minSquare =
            parseInt(params.get("minSquare")) >= MIN_square
                ? parseInt(params.get("minSquare"))
                : MIN_square || MIN_square;
        const maxSquare =
            parseInt(params.get("maxSquare")) >= MIN_square
                ? parseInt(params.get("maxSquare"))
                : MAX_square || MAX_square;
        setCategoryList(reverseTranslateCategory(category));
        setPriceValues([minPrice, maxPrice]);
        setSquaresValues([minSquare, maxSquare]);
    }, []);

    const updateURLParams = useCallback(() => {
        const params = new URLSearchParams();
        params.set("category", translateCategory(categoryList));
        params.set("minPrice", priceValues[0].toString());
        params.set("maxPrice", priceValues[1].toString());
        params.set("minSquare", squareValues[0].toString());
        params.set("maxSquare", squareValues[1].toString());
        window.history.replaceState({}, "", `?${params.toString()}`);
    }, [categoryList, priceValues, squareValues]);
    useEffect(() => {
        updateURLParams();
    }, [categoryList, priceValues, squareValues, updateURLParams]);
    useEffect(() => {
        fetchCards();
    }, [categoryList, fetchCards]);
    useEffect(() => {
        changeCategory(translateCategory(categoryList));
    }, [categoryList, changeCategory]);
    useEffect(() => {
        changeRooms(rooms);
    }, [changeRooms, rooms]);
    useEffect(() => {
        changeMinPrice(priceValues[0]);
        changeMaxPrice(priceValues[1]);
        changeMinSquare(squareValues[0]);
        changeMaxSquare(squareValues[1]);
    }, [
        changeMaxPrice,
        changeMaxSquare,
        changeMinPrice,
        changeMinSquare,
        priceValues,
        squareValues,
    ]);
    useEffect(() => {
        changeAmm(amm);
    }, [amm, changeAmm]);

    return (
        <div className={styles.filterBlock}>
            <ul className={styles.categories}>
                {avalaibleCategories.map((category) => (
                    <li key={category}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={`${styles.category_btn} ${
                                categoryList && categoryList.includes(category)
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => setCategoryList(category)}
                        >
                            {category}
                        </Button>
                    </li>
                ))}
            </ul>
            {categoryList !== "Избранное" && (
                <>
                    <div className={styles.filters}>
                        <div className={styles.filter}>
                            <p className={styles.filter_title}>Цена Р</p>
                            <div className={styles.filter_content}>
                                <Input
                                    theme={InputTheme.FILTER}
                                    value={priceValues[0].toString()}
                                    onChange={(val) =>
                                        onInputChange(
                                            "min",
                                            !isNaN(parseInt(val))
                                                ? parseInt(val)
                                                : 100,
                                            "price"
                                        )
                                    }
                                    type="number"
                                    min={MIN_price}
                                    max={MAX_price}
                                />
                                <Slider
                                    range
                                    min={MIN_price}
                                    max={MAX_price}
                                    count={1}
                                    value={priceValues}
                                    onChange={(values) =>
                                        onSliderChange(values, "price")
                                    }
                                />
                                <Input
                                    theme={InputTheme.FILTER}
                                    value={priceValues[1].toString()}
                                    onChange={(val) =>
                                        onInputChange(
                                            "max",
                                            !isNaN(parseInt(val))
                                                ? parseInt(val) > MAX_price
                                                    ? MAX_price
                                                    : parseInt(val)
                                                : 100,
                                            "price"
                                        )
                                    }
                                    type="number"
                                    min={MIN_price}
                                    max={MAX_price}
                                />
                            </div>
                        </div>
                        <div className={styles.filter}>
                            {categoryList === "Квартиры" ? (
                                <>
                                    <p className={styles.filter_title}>
                                        Количество комнат
                                    </p>

                                    <ul className={styles.rooms}>
                                        {avalaibleRooms.map((item) => (
                                            <li
                                                className={styles.room_check}
                                                key={item}
                                            >
                                                <Checkbox
                                                    title={item}
                                                    checked={rooms.includes(
                                                        item
                                                    )}
                                                    onChecked={(room) =>
                                                        setRooms((prev) => [
                                                            ...prev,
                                                            room,
                                                        ])
                                                    }
                                                    onUnchecked={(room) =>
                                                        setRooms(
                                                            rooms.filter(
                                                                (item) =>
                                                                    item !==
                                                                    room
                                                            )
                                                        )
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <p className={styles.filter_title}>
                                        Площадь м2
                                    </p>
                                    <div className={styles.filter_content}>
                                        <Input
                                            theme={InputTheme.FILTER}
                                            value={squareValues[0].toString()}
                                            onChange={(val) =>
                                                onInputChange(
                                                    "min",
                                                    !isNaN(parseInt(val))
                                                        ? parseInt(val)
                                                        : 100,
                                                    "square"
                                                )
                                            }
                                            type="number"
                                            min={MIN_square}
                                            max={MAX_square}
                                        />
                                        <Slider
                                            range
                                            min={MIN_square}
                                            max={MAX_square}
                                            count={1}
                                            value={squareValues}
                                            onChange={(values) =>
                                                onSliderChange(values, "square")
                                            }
                                        />
                                        <Input
                                            theme={InputTheme.FILTER}
                                            value={squareValues[1].toString()}
                                            onChange={(val) =>
                                                onInputChange(
                                                    "max",
                                                    !isNaN(parseFloat(val))
                                                        ? parseInt(val) >
                                                          MAX_square
                                                            ? MAX_square
                                                            : parseInt(val)
                                                        : 100,
                                                    "square"
                                                )
                                            }
                                            type="number"
                                            min={MIN_square}
                                            max={MAX_square}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={styles.amm_filter}>
                        {categoryList === "Квартиры" && (
                            <>
                                <p>Фильтрация по удобствам</p>
                                <div>
                                    <ul className={styles.amm_vars}>
                                        {PlacementAmm.map((item) => (
                                            <li
                                                className={styles.amm_item}
                                                key={item.title}
                                            >
                                                <Checkbox
                                                    title={item.title}
                                                    checked={amm.includes(
                                                        item.title
                                                    )}
                                                    onChecked={(room) =>
                                                        setAmm((prev) => [
                                                            ...prev,
                                                            room,
                                                        ])
                                                    }
                                                    onUnchecked={(room) =>
                                                        setAmm(
                                                            amm.filter(
                                                                (item) =>
                                                                    item !==
                                                                    room
                                                            )
                                                        )
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        {categoryList === "Гаражи" && (
                            <>
                                <p>Фильтрация по удобствам</p>
                                <ul className={styles.amm_vars_small}>
                                    {GarageAmm.map((item) => (
                                        <li
                                            className={styles.amm_item}
                                            key={item.title}
                                        >
                                            <Checkbox
                                                title={item.title}
                                                checked={amm.includes(
                                                    item.title
                                                )}
                                                onChecked={(room) =>
                                                    setAmm((prev) => [
                                                        ...prev,
                                                        room,
                                                    ])
                                                }
                                                onUnchecked={(room) =>
                                                    setAmm(
                                                        amm.filter(
                                                            (item) =>
                                                                item !== room
                                                        )
                                                    )
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {categoryList === "Склады" && (
                            <>
                                <p>Фильтрация по удобствам</p>
                                <ul className={styles.amm_vars}>
                                    {StorageAmm.map((item) => (
                                        <li
                                            className={styles.amm_item}
                                            key={item.title}
                                        >
                                            <Checkbox
                                                title={item.title}
                                                checked={amm.includes(
                                                    item.title
                                                )}
                                                onChecked={(room) =>
                                                    setAmm((prev) => [
                                                        ...prev,
                                                        room,
                                                    ])
                                                }
                                                onUnchecked={(room) =>
                                                    setAmm(
                                                        amm.filter(
                                                            (item) =>
                                                                item !== room
                                                        )
                                                    )
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {categoryList === "Офисы" && (
                            <>
                                <p>Фильтрация по удобствам</p>
                                <ul className={styles.amm_vars_small}>
                                    {OfficeAmm.map((item) => (
                                        <li
                                            className={styles.amm_item}
                                            key={item.title}
                                        >
                                            <Checkbox
                                                title={item.title}
                                                checked={amm.includes(
                                                    item.title
                                                )}
                                                onChecked={(room) =>
                                                    setAmm((prev) => [
                                                        ...prev,
                                                        room,
                                                    ])
                                                }
                                                onUnchecked={(room) =>
                                                    setAmm(
                                                        amm.filter(
                                                            (item) =>
                                                                item !== room
                                                        )
                                                    )
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {categoryList === "Торговые" && (
                            <>
                                <p>Фильтрация по удобствам</p>
                                <ul className={styles.amm_vars_small}>
                                    {TradingAmm.map((item) => (
                                        <li
                                            className={styles.amm_item}
                                            key={item.title}
                                        >
                                            <Checkbox
                                                title={item.title}
                                                checked={amm.includes(
                                                    item.title
                                                )}
                                                onChecked={(room) =>
                                                    setAmm((prev) => [
                                                        ...prev,
                                                        room,
                                                    ])
                                                }
                                                onUnchecked={(room) =>
                                                    setAmm(
                                                        amm.filter(
                                                            (item) =>
                                                                item !== room
                                                        )
                                                    )
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
