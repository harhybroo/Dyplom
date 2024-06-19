import { useUserStore } from "entities/User";
import { useCallback } from "react";
import { LOCALSTORAGE_TOKEN_KEY } from "shared/const/localstorage";
import styles from "./UserInfo.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
export const UserInfo = () => {
    const navigate = useNavigate();
    const fetchUser = useUserStore((state) => state.fetchUser);
    const onClickLogout = useCallback(() => {
        window.localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
        fetchUser();
    }, [fetchUser]);
    return (
        <div className={styles.info}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.profile}
                onClick={() => navigate(`/profile`)}
            >
                Профиль
            </Button>
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.logout}
                onClick={onClickLogout}
            >
                Выйти
            </Button>
        </div>
    );
};
