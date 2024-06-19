import React, { memo, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";
type HTMLTextAreaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
>;

type TextAreaProps = {
    value?: string;
    onChange?: (value: string) => void;
} & HTMLTextAreaProps;

export const TextArea = memo((props: TextAreaProps) => {
    const { value, onChange, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };
    return (
        <div className={styles.textArea} data-testid="textarea">
            <textarea
                {...otherProps}
                value={value}
                onChange={onChangeHandler}
                autoCapitalize="off"
            />
        </div>
    );
});
