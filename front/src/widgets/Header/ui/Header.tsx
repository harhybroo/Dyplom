import React, { memo, useEffect } from "react";
import styles from "./Header.module.scss";
import BedIcon from "shared/assets/icons/bed.svg?react";
import SearchIcon from "shared/assets/icons/search.svg?react";
import MoreIcon from "shared/assets/icons/more.svg?react";
import UserIcon from "shared/assets/icons/user.svg?react";

import { Button, ButtonTheme } from "shared/ui/Button/Button";
import Input, { InputTheme } from "shared/ui/Input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
import { ChangeCity } from "features/ChangeCity";
import { UserInfo } from "features/UserInfo";
import { InfoModal } from "shared/ui/InfoModal/InfoModal";
import { UserActions } from "features/UserActions";
import { useAuthSelector } from "entities/User";
import { useFilterStore } from "entities/Placement/model/store/FilterStore";
export const Header = memo(() => {
    const navigate = useNavigate();
    const isAuthed = useAuthSelector();
    const location = useLocation();
    const [value, setValue] = React.useState("");
    const [userModalOpened, setUserModalOpened] = React.useState(false);
    const [userActionsOpened, setUserActionsOpened] = React.useState(false);
    const changeSearch = useFilterStore((state) => state.changeSearch);
    const isMainPage = location.pathname === RouterPath.main;
    useEffect(() => {
        changeSearch(value);
    }, [changeSearch, value]);
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.logo}
                    onClick={() => navigate(RouterPath.main)}
                >
                    <BedIcon className={styles.icon} />
                    <span className={styles.title}>SmirStay</span>
                </Button>
                <ChangeCity />
            </div>
            {isMainPage && (
                <div className={styles.center}>
                    <Input
                        theme={InputTheme.SEARCH}
                        value={value}
                        onChange={(val) => setValue(val)}
                        placeholder="Введите название"
                    >
                        <SearchIcon />
                    </Input>
                </div>
            )}
            {isAuthed ? (
                <div className={styles.authed}>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={styles.more}
                        onClick={() =>
                            setTimeout(
                                () => setUserActionsOpened(!userActionsOpened),
                                0
                            )
                        }
                    >
                        <MoreIcon />
                    </Button>
                    {userActionsOpened && (
                        <InfoModal
                            className={styles.userActions}
                            onClose={() => setUserActionsOpened(false)}
                        >
                            <UserActions />
                        </InfoModal>
                    )}
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={styles.user}
                        onClick={() =>
                            setTimeout(
                                () => setUserModalOpened(!userModalOpened),
                                0
                            )
                        }
                    >
                        <UserIcon />
                    </Button>
                    {userModalOpened && (
                        <InfoModal
                            className={styles.userInfo}
                            onClose={() => setUserModalOpened(false)}
                        >
                            <UserInfo />
                        </InfoModal>
                    )}
                </div>
            ) : (
                <div className={styles.right}>
                    <Button
                        theme={ButtonTheme.SIGNUP}
                        className={styles.signup}
                        onClick={() => navigate(RouterPath.signup)}
                    >
                        Регистрация
                    </Button>
                    <Button
                        theme={ButtonTheme.SIGNIN}
                        className={styles.signin}
                        onClick={() => navigate(RouterPath.signin)}
                    >
                        Войти
                    </Button>
                </div>
            )}
        </header>
    );
});
