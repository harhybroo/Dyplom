import { useCallback, useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import { Button, ButtonTheme } from "../Button/Button";

export enum DropdownSize {
    DEFAULT = "default",
    SMALL = "small",
}

interface DropdownProps {
    onSelect: (selected: string) => void;
    list: string[];
    size?: DropdownSize;
    value: string;
}

export const Dropdown = (props: DropdownProps) => {
    const { onSelect, size = DropdownSize.DEFAULT, list, value } = props;
    const [selectedOption, setSelectedOption] = useState(null);
    const [openList, setOpenList] = useState(false);
    const handleSelectList = useCallback(
        (item: string) => {
            setSelectedOption(item);
            setOpenList(false);
            onSelect(item);
        },
        [onSelect]
    );
    useEffect(() => {
        value && setSelectedOption(value);
    }, [value]);

    return (
        <div
            className={`${styles.dropdown} ${styles[size]} ${
                openList ? styles.opened : ""
            }`}
            onMouseLeave={() => setOpenList(false)}
        >
            <div className={styles.dropdown_content}>
                <Button
                    theme={ButtonTheme.DROPDOWN}
                    className={styles.dropdown_button}
                    onClick={() => {
                        setOpenList(!openList);
                    }}
                >
                    {selectedOption ? selectedOption : "Выбрать"}
                </Button>
                {openList && (
                    <ul className={styles.dropdown_list}>
                        {list.map((item, index) => (
                            <li key={index}>
                                <Button
                                    theme={ButtonTheme.CLEAR}
                                    className={`${styles.dropdown_item} ${
                                        item === selectedOption
                                            ? styles.active
                                            : ""
                                    }`}
                                    onClick={() => handleSelectList(item)}
                                >
                                    {item}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default Dropdown;
