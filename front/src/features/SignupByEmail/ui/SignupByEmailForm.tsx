import { useCallback, useState } from "react";
import InputMask from "react-input-mask";
import styles from "./SignupByEmailForm.module.scss";

import EmailIcon from "shared/assets/icons/email.svg?react";
import PassIcon from "shared/assets/icons/password.svg?react";
import UserIcon from "shared/assets/icons/user.svg?react";
import PhoneIcon from "shared/assets/icons/phone.svg?react";

import Input, { InputTheme } from "shared/ui/Input/Input";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
import { useUserStore } from "entities/User";
import { SignupByEmailService } from "../model/services/SignupByEmailService";

export const SignupByEmailForm = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [telValue, setTelValue] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        tel: false,
        email: false,
        pass: false,
    });
    const fetchUser = useUserStore((state) => state.fetchUser);

    const ValidateFields = () => {
        const cleanedPhoneNumber = telValue.replace(/[()+-\s]/g, "");
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {
            email: !regex.test(emailValue),
            pass: passValue.length < 5,
            tel: cleanedPhoneNumber.length !== 11,
            name: nameValue.length < 2,
        };
        setErrors(newErrors);
        if (!Object.values(newErrors).some((value) => value)) {
            onClickRegister();
        }
    };
    const onClickRegister = useCallback(() => {
        SignupByEmailService({
            email: emailValue,
            password: passValue,
            name: nameValue,
            tel: telValue,
        }).then(() => fetchUser());
    }, [emailValue, fetchUser, nameValue, passValue, telValue]);
    return (
        <>
            <div className={styles.signupForm}>
                <div className={styles.signupForm_wrapper}>
                    <div className={styles.signupForm_info}>
                        <h2 className={styles.info_title}>Регистрация</h2>
                        <p className={styles.info_desc}>
                            Создайте бесплатный аккаунт
                        </p>
                    </div>
                    <div className={styles.signupForm_fields}>
                        <div className={errors.email ? styles.error : ""}>
                            <Input
                                onChange={(val) => setEmailValue(val)}
                                value={emailValue}
                                theme={InputTheme.AUTH}
                                placeholder="Введите почту"
                                type="email"
                            >
                                <EmailIcon />
                            </Input>
                        </div>
                        <div className={errors.name ? styles.error : ""}>
                            <Input
                                onChange={(val) => setNameValue(val)}
                                value={nameValue}
                                theme={InputTheme.AUTH}
                                placeholder="Введите имя"
                                type="text"
                            >
                                <UserIcon />
                            </Input>
                        </div>

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
                                value={telValue}
                                placeholder="Введите номер телефона"
                                onChange={(e) => setTelValue(e.target.value)}
                            />
                        </div>
                        <div className={errors.pass ? styles.error : ""}>
                            <Input
                                onChange={(val) => setPassValue(val)}
                                value={passValue}
                                theme={InputTheme.AUTH}
                                placeholder="Введите пароль"
                                type="password"
                            >
                                <PassIcon />
                            </Input>
                        </div>
                    </div>
                    <div className={styles.signupForm_bottom}>
                        <div className={styles.signupForm_bottom_links}>
                            <span className={styles.already}>
                                Уже есть аккаунт?
                            </span>
                            <AppLink
                                to={RouterPath.signin}
                                className={styles.enter}
                            >
                                Войти
                            </AppLink>
                        </div>
                        <Button
                            theme={ButtonTheme.AUTH}
                            onClick={ValidateFields}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
