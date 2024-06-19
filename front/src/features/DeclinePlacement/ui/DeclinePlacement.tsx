import { useState } from "react";
import styles from "./DeclinePlacement.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import DeclineIcon from "shared/assets/icons/close.svg?react";
import { Modal } from "shared/ui/Modal/Modal";
import { DeclinePlacementService } from "../model/services/DeclinePlacementService";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
interface DeclineProps {
    id: number;
}
export const DeclinePlacement = (props: DeclineProps) => {
    const { id } = props;

    const [warnOpened, setWarnOpened] = useState(false);
    const fetchReviewCard = usePlacementStore(
        (state) => state.fetchReviewCards
    );
    const onClickConfirm = () => {
        DeclinePlacementService({ id: id })
            .then(() => fetchReviewCard())
            .then(() => setWarnOpened(false));
    };
    return (
        <div className={styles.delete}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.btn}
                onClick={() => setWarnOpened(true)}
            >
                <DeclineIcon className={styles.icon} />
            </Button>
            {warnOpened && (
                <Modal isOpen={warnOpened} onClose={() => setWarnOpened(false)}>
                    <div className={styles.warn}>
                        <p className={styles.title}>
                            Подтвердите удаление карточки
                        </p>
                        <div className={styles.btns}>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                className={styles.confirm}
                                onClick={onClickConfirm}
                            >
                                Удалить
                            </Button>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                className={styles.cancel}
                                onClick={() => setWarnOpened(false)}
                            >
                                Отмена
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
