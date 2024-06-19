import { useCallback, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import { Button, ButtonTheme } from "../Button/Button";
import Input, { InputTheme } from "../Input/Input";

interface SelectProps {
    onSelect: (selected: string) => void;
    list: string[];

    value: string;
}

export const Select = (props: SelectProps) => {
    const { onSelect, list, value } = props;
    const [selectedOption, setSelectedOption] = useState("");
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
            className={`${styles.select}  ${openList ? styles.opened : ""}`}
            onMouseLeave={() => setOpenList(false)}
        >
            <div className={styles.select_content}>
                <Input
                    theme={InputTheme.FORM}
                    onClick={() => {
                        setOpenList(true);
                    }}
                    value={selectedOption}
                    onChange={(val) => setSelectedOption(val)}
                />

                {openList && (
                    <ul className={styles.select_list}>
                        {list.filter((item) =>
                            item
                                .toLocaleLowerCase()
                                .includes(selectedOption.toLocaleLowerCase())
                        ).length > 0 ? (
                            list
                                .filter((item) =>
                                    item
                                        .toLocaleLowerCase()
                                        .includes(
                                            selectedOption.toLocaleLowerCase()
                                        )
                                )
                                .map((item, index) => (
                                    <li key={index}>
                                        <Button
                                            theme={ButtonTheme.CLEAR}
                                            className={`${styles.select_item} ${
                                                item === selectedOption
                                                    ? styles.active
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleSelectList(item)
                                            }
                                        >
                                            {item}
                                        </Button>
                                    </li>
                                ))
                        ) : (
                            <li className={styles.item_noutfoud}>
                                Ничего не найдено
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default Select;
