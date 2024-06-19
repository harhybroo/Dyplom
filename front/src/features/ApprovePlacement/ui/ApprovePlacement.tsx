import { useState } from "react";
import styles from "./ApprovePlacement.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import TrashcanIcon from "shared/assets/icons/check.svg?react";
import { Modal } from "shared/ui/Modal/Modal";
import { usePlacementStore } from "entities/Placement/model/store/PlacementStore";
import { ApprovePlacementService } from "../model/services/ApprovePlacementService";
interface ApproveProps {
    id: number;
}
export const ApprovePlacement = (props: ApproveProps) => {
    const { id } = props;
    const [warnOpened, setWarnOpened] = useState(false);
    const fetchReviewCard = usePlacementStore(
        (state) => state.fetchReviewCards
    );
    const onClickConfirm = () => {
        ApprovePlacementService({ id: id })
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
                <TrashcanIcon className={styles.icon} />
            </Button>
            {warnOpened && (
                <Modal isOpen={warnOpened} onClose={() => setWarnOpened(false)}>
                    <div className={styles.warn}>
                        <p className={styles.title}>
                            Подтвердите одобрение карточки
                        </p>
                        <div className={styles.btns}>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                className={styles.confirm}
                                onClick={onClickConfirm}
                            >
                                Одобрить
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
