import styles from "./UserActions.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
import { useAdminSelector } from "entities/User";
export const UserActions = () => {
    const navigate = useNavigate();
    const isAdmin = useAdminSelector();
    return (
        <div className={`${styles.info} ${isAdmin ? styles.info_admin : ""}`}>
            {isAdmin && (
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.item}
                    onClick={() => navigate(RouterPath.new_placements)}
                >
                    Новые помещения
                </Button>
            )}
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.item}
                onClick={() => navigate(RouterPath.create_placement)}
            >
                Добавить помещение
            </Button>
        </div>
    );
};
