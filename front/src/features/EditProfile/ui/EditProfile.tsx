import { useState } from "react";
import InputMask from "react-input-mask";

import styles from "./EditProfile.module.scss";
import { useUserStore } from "entities/User";
import Input, { InputTheme } from "shared/ui/Input/Input";

import EmailIcon from "shared/assets/icons/email.svg?react";
import PassIcon from "shared/assets/icons/password.svg?react";
import UserIcon from "shared/assets/icons/user.svg?react";
import PhoneIcon from "shared/assets/icons/phone.svg?react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { EditProfileProps } from "../model/types/EditProfileType";
import { EditProfileSerivce } from "../model/services/EditProfileSerivce";
export const EditProfile = (props: EditProfileProps) => {
    const { onCancel } = props;
    const user = useUserStore((state) => state.user);
    const [newName, setNewName] = useState(user.name);
    const [newTel, setNewTel] = useState(user.tel);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPass, setNewPass] = useState("");

    const [errors, setErrors] = useState({
        name: false,
        tel: false,
        email: false,
        pass: false,
    });
    const fetchUser = useUserStore((state) => state.fetchUser);
    const ValidateFields = () => {
        const cleanedPhoneNumber = newTel.replace(/[()+-\s]/g, "");
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            email: !regex.test(newEmail),
            pass: !(newPass === "" || newPass.length > 5),
            tel: cleanedPhoneNumber.length !== 11,
            name: newName.length < 2,
        };
        setErrors(newErrors);
        if (!Object.values(newErrors).some((value) => value)) {
            EditProfile();
        }
    };
    const EditProfile = () => {
        EditProfileSerivce({
            userId: user.id,
            name: newName,
            email: newEmail,
            tel: newTel,
            pass: newPass,
        })
            .then(() => fetchUser())
            .then(onCancel);
    };
    return (
        <div className={styles.edit}>
            <div className={styles.signupForm_fields}>
                <div className={errors.email ? styles.error : ""}>
                    <p>Email адрес</p>
                    <Input
                        onChange={(val) => setNewEmail(val)}
                        value={newEmail}
                        theme={InputTheme.AUTH}
                        placeholder="Введите почту"
                        type="email"
                    >
                        <EmailIcon />
                    </Input>
                </div>
                <div className={errors.name ? styles.error : ""}>
                    <p>Имя пользователя</p>
                    <Input
                        onChange={(val) => setNewName(val)}
                        value={newName}
                        theme={InputTheme.AUTH}
                        placeholder="Введите имя"
                        type="text"
                    >
                        <UserIcon />
                    </Input>
                </div>
                <div className={errors.name ? styles.error : ""}>
                    <p>Номер телефона</p>

                    <div
                        className={`${styles.phone} ${
                            errors.tel ? styles.error : ""
                        }`}
                    >
                        <PhoneIcon />
                        <InputMask
                            className={styles.phone_input}
                            mask="+7-(999)-999-99-99"
                            maskChar=" "
                            value={newTel}
                            placeholder="Введите номер телефона"
                            onChange={(e) => setNewTel(e.target.value)}
                        />
                    </div>
                </div>

                <div className={errors.pass ? styles.error : ""}>
                    <p>Пароль</p>
                    <Input
                        onChange={(val) => setNewPass(val)}
                        value={newPass}
                        theme={InputTheme.AUTH}
                        placeholder="Введите пароль"
                        type="password"
                    >
                        <PassIcon />
                    </Input>
                </div>
            </div>
            <div className={styles.btns}>
                <Button theme={ButtonTheme.SIGNUP} onClick={onCancel}>
                    Отмена
                </Button>
                <Button theme={ButtonTheme.SIGNIN} onClick={ValidateFields}>
                    Подтвердить
                </Button>
            </div>
        </div>
    );
};
