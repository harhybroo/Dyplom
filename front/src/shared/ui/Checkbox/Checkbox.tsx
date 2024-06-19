import React, { ReactNode, useState } from "react";
import styles from "./Checkbox.module.scss";
interface CheckboxProps {
    title: string;
    onChecked: (title: string) => void;
    checked: boolean;
    onUnchecked: (title: string) => void;
    icon?: ReactNode;
}
export const Checkbox = (props: CheckboxProps) => {
    const { title, onChecked, checked, onUnchecked, icon } = props;
    const [isChecked, setIsChecked] = useState(checked);
    const onClickSelect = () => {
        if (!isChecked) {
            setIsChecked(true);
            onChecked(title);
        }
        if (isChecked) {
            setIsChecked(false);
            onUnchecked(title);
        }
    };
    return (
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onClickSelect}
            />
            <span className={styles.mark}></span>
            <div className={styles.info}>
                {title}
                {icon}
            </div>
        </label>
    );
};
