import React, { useCallback } from "react";
import styles from "./SigninByEmailForm.module.scss";
import EmailIcon from "shared/assets/icons/email.svg?react";
import PassIcon from "shared/assets/icons/password.svg?react";
import Input, { InputTheme } from "shared/ui/Input/Input";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useUserStore } from "entities/User";
import { SigninByEmailService } from "../model/services/SigninByEmailService";
export const SigninByEmailForm = () => {
    const [emailValue, setEmailValue] = React.useState("");
    const [passValue, setPassValue] = React.useState("");

    const fetchUser = useUserStore((state) => state.fetchUser);

    const onClickLogin = useCallback(() => {
        SigninByEmailService({
            email: emailValue,
            password: passValue,
        }).then(() => fetchUser());
    }, [emailValue, fetchUser, passValue]);
    return (
        <>
            <div className={styles.signinForm}>
                <div className={styles.signinForm_wrapper}>
                    <div className={styles.signinForm_info}>
                        <h2 className={styles.info_title}>Добро пожаловать!</h2>
                        <p className={styles.info_desc}>
                            Войдите в свой аккаунт
                        </p>
                    </div>
                    <div className={styles.signinForm_fields}>
                        <Input
                            onChange={(val) => setEmailValue(val)}
                            value={emailValue}
                            theme={InputTheme.AUTH}
                            placeholder="Введите почту"
                            type="email"
                        >
                            <EmailIcon />
                        </Input>
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
                    <div className={styles.signinForm_bottom}>
                        <div className={styles.signinForm_bottom_links}>
                            <span className={styles.already}>
                                Не зарегистрированы?
                            </span>
                            <AppLink to="/signup" className={styles.enter}>
                                Зарегистрируйтесь
                            </AppLink>
                        </div>
                        <Button theme={ButtonTheme.AUTH} onClick={onClickLogin}>
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
