import { useEffect, useState } from "react";
import styles from "../Placement.module.scss";
import { cityList } from "shared/const/cityLists";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import Input, { InputTheme } from "shared/ui/Input/Input";
import Select from "shared/ui/Select/Select";
import { TextArea } from "shared/ui/TextArea/TextArea";
import Dropdown, { DropdownSize } from "shared/ui/Dropdown/Dropdown";
import { Checkbox } from "shared/ui/Checkbox/Checkbox";
import TVIcon from "shared/assets/icons/tv.svg?react";
import FreezerIcon from "shared/assets/icons/freezer.svg?react";
import EthernetIcon from "shared/assets/icons/ethernet.svg?react";
import ConditionerIcon from "shared/assets/icons/conditioner.svg?react";
import WashIcon from "shared/assets/icons/wash.svg?react";
import FurnitureIcon from "shared/assets/icons/furniture.svg?react";
import KitchenFurnitureIcon from "shared/assets/icons/kitchen_furniture.svg?react";
import { CreateCardService } from "features/CreatePlacement/model/services/CreateCardService";
import { CreatePlacementService } from "features/CreatePlacement/model/services/CreatePlacementService";
import { EditCardService } from "features/CreatePlacement/model/services/EditCardService";
import { CreateCardPhotoService } from "features/CreatePlacement/model/services/CreateCardPhotoService";
import { useNavigate } from "react-router-dom";
import { Modal } from "shared/ui/Modal/Modal";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
import { useUserStore } from "entities/User";
export const PlacementForm = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [userCity, setUserCity] = useState(null);
    const [rooms, setRooms] = useState("1");
    const [squareTotal, setSquareTotal] = useState(1);
    const [livingSquare, setLivingSquare] = useState(1);
    const [street, setStreet] = useState("");
    const [houseNum, setHouseNum] = useState(1);
    const [flat, setFlat] = useState(1);
    const [amenities, setAmenities] = useState([]);
    const [floor, setFloor] = useState(1);
    const [totalFloor, setTotalFloor] = useState(9);
    const roomVariables = ["1", "2", "3", "4", "5", "6+"];
    const [price, setPrice] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [images, setImages] = useState([]);
    const [ready, setReady] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        desc: false,
        street: false,
        main: false,
        images: false,
    });
    const amenitiesVariables = [
        {
            title: "Телевизор",
            icon: <TVIcon />,
        },
        {
            title: "Холодильник",
            icon: <FreezerIcon />,
        },
        {
            title: "Интернет",
            icon: <EthernetIcon />,
        },
        {
            title: "Кондиционер",
            icon: <ConditionerIcon />,
        },
        {
            title: "Стиральная машина",
            icon: <WashIcon />,
        },
        {
            title: "Посудомоечная машина",
            icon: <WashIcon />,
        },
        {
            title: "Кухонная мебель",
            icon: <KitchenFurnitureIcon />,
        },
        {
            title: "Комнатная мебель",
            icon: <FurnitureIcon />,
        },
    ];
    useEffect(() => {
        setUserCity(window.localStorage.getItem("city"));
    }, []);
    const validateFields = () => {
        const newErrors = {
            title: title.length < 10,
            desc: desc.length < 10,
            street: street.length < 3,
            main: mainImage === null,
            images: images.length === 0,
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some((value) => value)) {
            onClickCreate();
        }
    };
    const onClickCreate = () => {
        CreatePlacementService({
            roomAmmount: rooms,
            square: squareTotal,
            living_square: livingSquare,
            ammenities: amenities,
            city: userCity,
            street: street,
            house_number: houseNum,
            apart_number: flat,
            flat: floor,
            flat_total: totalFloor,
            contact_name: user.name,
            contact_number: user.tel,
        }).then((res) =>
            CreateCardService({
                title: title,
                desc: desc,
                price: price,
                status: "review",
            })
                .then((res2) => {
                    EditCardService({
                        placementId: res.data.id,
                        id: res2.data.id,
                    });
                    CreateCardPhotoService({
                        image: mainImage,
                        id: res2.data.id,
                    });
                    images.length > 0 &&
                        images.forEach((item) =>
                            setTimeout(() => {
                                CreateCardPhotoService({
                                    image: item,
                                    id: res2.data.id,
                                });
                            }, 1000)
                        );
                })
                .then(() => setReady(true))
        );
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleImageChangeMultiple = (e) => {
        setImages((prevImages) => [
            ...prevImages,
            ...Array.from(e.target.files),
        ]);
    };

    const handleSubmitMultiple = (e) => {
        e.preventDefault();
    };
    if (ready) {
        return (
            <Modal isOpen={ready} onClose={() => navigate(RouterPath.main)}>
                <div className={styles.success}>
                    <h1>Зявка отправлена</h1>
                    <Button
                        theme={ButtonTheme.CREATE}
                        onClick={() => navigate(RouterPath.main)}
                    >
                        Закрыть
                    </Button>
                </div>
            </Modal>
        );
    }
    return (
        <div className={styles.placement}>
            <div className={styles.placement_left}>
                <div className={`${styles.block}`}>
                    <p className={styles.block_title}>Название *</p>
                    <span
                        className={`${styles.block_desc} ${
                            errors.title ? styles.error : ""
                        }`}
                    >
                        Укажите название карточки
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={title}
                        onChange={(val) => setTitle(val)}
                        placeholder="Название"
                    />
                </div>
                <div className={styles.block}>
                    <p className={styles.block_title}>Описание *</p>
                    <span
                        className={`${styles.block_desc} ${
                            errors.desc ? styles.error : ""
                        }`}
                    >
                        Укажите описание
                    </span>
                    <TextArea
                        className={styles.desc}
                        value={desc}
                        onChange={(val) => setDesc(val)}
                        placeholder="Описание квартиры"
                    />
                </div>
                <div className={styles.block}>
                    <p className={styles.block_title}>Количество комнат *</p>
                    <span className={styles.block_desc}>
                        Укажите количество комнат в помещении
                    </span>
                    <Dropdown
                        size={DropdownSize.SMALL}
                        list={roomVariables}
                        value={rooms}
                        onSelect={(val) => setRooms(val)}
                    />
                </div>
                <div className={`${styles.block} ${styles.square}`}>
                    <p className={styles.block_title}>Площадь (м2) *</p>
                    <span className={styles.block_desc}>
                        Укажите общую площадь помещения в квадратных метрах
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={squareTotal.toString()}
                        onChange={(val) =>
                            setSquareTotal(
                                !isNaN(parseFloat(val)) ? parseFloat(val) : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={1000}
                        step={0.1}
                    />
                </div>
                <div className={`${styles.block} ${styles.square}`}>
                    <p className={styles.block_title}>Жилая площадь (м2) *</p>
                    <span className={styles.block_desc}>
                        Укажите жилую площадь помещения в квадратных метрах
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={livingSquare.toString()}
                        onChange={(val) =>
                            setLivingSquare(
                                !isNaN(parseFloat(val)) ? parseFloat(val) : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={1000}
                        step={0.1}
                    />
                </div>
                <div className={styles.block}>
                    <p className={styles.block_title}>Удобства (опционально)</p>
                    <span className={styles.block_desc}>
                        Укажите удобства,которые предоставляются в помещении
                    </span>
                    <ul className={styles.amenities}>
                        {amenitiesVariables.map((item) => (
                            <li
                                className={styles.amenities_item}
                                key={item.title}
                            >
                                <Checkbox
                                    title={item.title}
                                    icon={item.icon}
                                    checked={amenities.includes(item.title)}
                                    onChecked={(title) =>
                                        setAmenities((prev) => [...prev, title])
                                    }
                                    onUnchecked={(title) =>
                                        setAmenities(
                                            amenities.filter(
                                                (item) => item !== title
                                            )
                                        )
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.block}>
                    <p className={styles.block_title}>Фото карточки *</p>
                    <span
                        className={`${styles.block_desc} ${
                            errors.main ? styles.error : ""
                        }`}
                    >
                        Загрузите главную фотографию карточки помещеня
                    </span>
                    <div className={styles.image_block}>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.image_block_form}
                        >
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleImageChange}
                                className={styles.image_block_input}
                            />
                            <Button
                                theme={ButtonTheme.CREATE}
                                onClick={() =>
                                    document.getElementById("fileInput").click()
                                }
                            >
                                Выберите файл
                            </Button>
                        </form>
                        {mainImage && (
                            <>
                                <p>Выбранное изображение:</p>
                                <div className={styles.image_block_preview}>
                                    <img
                                        src={URL.createObjectURL(mainImage)}
                                        alt="uploaded"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.block}>
                    <p className={styles.block_title}>Фото помещения *</p>
                    <span
                        className={`${styles.block_desc} ${
                            errors.images ? styles.error : ""
                        }`}
                    >
                        Загрузите дополнительные фотографии помещения
                    </span>
                    <div className={styles.image_block}>
                        <form
                            onSubmit={handleSubmitMultiple}
                            className={styles.image_block_form}
                        >
                            <input
                                id="fileInput2"
                                type="file"
                                multiple
                                onChange={handleImageChangeMultiple}
                                className={styles.image_block_input}
                            />
                            <Button
                                theme={ButtonTheme.CREATE}
                                onClick={() =>
                                    document
                                        .getElementById("fileInput2")
                                        .click()
                                }
                            >
                                Выберите файлы
                            </Button>
                        </form>
                        {images && (
                            <>
                                <p>Выбранные изображение:</p>
                                <div className={styles.image_block_preview}>
                                    {images.length > 0 &&
                                        images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(image)}
                                                alt="uploaded"
                                            />
                                        ))}
                                </div>
                                {images.length > 0 && (
                                    <Button
                                        theme={ButtonTheme.CREATE}
                                        onClick={() => setImages([])}
                                    >
                                        Обнулить
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.placement_right}>
                <div className={`${styles.block} ${styles.city}`}>
                    <p className={styles.block_title}>Город *</p>
                    <span className={`${styles.block_desc}`}>
                        Укажите город в котором находится помещение
                    </span>
                    <Select
                        list={cityList}
                        value={userCity}
                        onSelect={(val) => setUserCity(val)}
                    />
                </div>
                <div className={`${styles.block} ${styles.city}`}>
                    <p className={styles.block_title}>Улица *</p>
                    <span
                        className={`${styles.block_desc} ${
                            errors.street ? styles.error : ""
                        }`}
                    >
                        Укажите улицу на которой находится помещение
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={street}
                        onChange={(val) => setStreet(val)}
                        placeholder="Улица"
                    />
                </div>
                <div className={`${styles.block} ${styles.num}`}>
                    <p className={styles.block_title}>Номер строения *</p>
                    <span className={styles.block_desc}>
                        Укажите номер строения
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={houseNum.toString()}
                        onChange={(val) =>
                            setHouseNum(
                                !isNaN(parseInt(val))
                                    ? parseInt(val) < 1000
                                        ? parseInt(val)
                                        : 1000
                                    : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={1000}
                        step={1}
                        placeholder="Дом"
                    />
                </div>
                <div className={`${styles.block} ${styles.num}`}>
                    <p className={styles.block_title}>Номер квартиры *</p>
                    <span className={styles.block_desc}>
                        Укажите номер квартиры
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={flat.toString()}
                        onChange={(val) =>
                            setFlat(
                                !isNaN(parseInt(val))
                                    ? parseInt(val) < 1000
                                        ? parseInt(val)
                                        : 1000
                                    : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={100}
                        step={1}
                        placeholder="Квартира"
                    />
                </div>
                <div className={`${styles.block} ${styles.num}`}>
                    <p className={styles.block_title}>Этаж *</p>
                    <span className={styles.block_desc}>
                        Укажите на каком этаже находится помещение
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={floor.toString()}
                        onChange={(val) =>
                            setFloor(
                                !isNaN(parseInt(val))
                                    ? parseInt(val) < 30
                                        ? parseInt(val)
                                        : 30
                                    : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={100}
                        step={1}
                        placeholder="Квартира"
                    />
                </div>
                <div className={`${styles.block} ${styles.num}`}>
                    <p className={styles.block_title}>Общее кол-во этажей *</p>
                    <span className={styles.block_desc}>
                        Укажите количество этажей в строении
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={totalFloor.toString()}
                        onChange={(val) =>
                            setTotalFloor(
                                !isNaN(parseInt(val))
                                    ? parseInt(val) < 30
                                        ? parseInt(val)
                                        : 30
                                    : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={100}
                        step={1}
                        placeholder="Квартира"
                    />
                </div>

                <div className={`${styles.block} ${styles.city}`}>
                    <p className={styles.block_title}>Стоимость (₽) *</p>
                    <span className={styles.block_desc}>
                        Укажите стоимость оплаты за месяц
                    </span>
                    <Input
                        theme={InputTheme.FORM}
                        value={price.toString()}
                        onChange={(val) =>
                            setPrice(
                                !isNaN(parseInt(val))
                                    ? parseInt(val) < 1000000
                                        ? parseInt(val)
                                        : 1000000
                                    : 1
                            )
                        }
                        type="number"
                        min={1}
                        max={1000000}
                        step={1}
                        placeholder="Цена"
                    />
                </div>
                <Button theme={ButtonTheme.CREATE} onClick={validateFields}>
                    Создать карточку
                </Button>
            </div>
        </div>
    );
};
