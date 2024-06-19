import { useAdminSelector, useUserStore } from "entities/User";
import styles from "./ProfileDetails.module.scss";
import { useState } from "react";
import UserIcon from "shared/assets/icons/user.svg?react";
import EmailIcon from "shared/assets/icons/email.svg?react";
import PhoneIcon from "shared/assets/icons/phone.svg?react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { EditProfile } from "features/EditProfile";
export const ProfileDetails = () => {
    const [isEditing, setEditing] = useState(false);
    const user = useUserStore((state) => state.user);
    const isAdmin = useAdminSelector();
    return (
        <div className={styles.profile}>
            <div className={styles.top}>
                <h1 className={styles.title}>Профиль</h1>
                {isAdmin ? (
                    <span className={styles.role_admin}>Администратор</span>
                ) : (
                    <span className={styles.role_user}>Пользователь</span>
                )}
            </div>

            {isEditing ? (
                <div className={styles.view}>
                    <div className={styles.view_info}>
                        <h2 className={styles.view_info_title}>
                            Редактирование данных
                        </h2>
                        <EditProfile onCancel={() => setEditing(false)} />
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.view}>
                        <div className={styles.view_info}>
                            <h2 className={styles.view_info_title}>
                                Данные пользователя
                            </h2>
                            <div className={styles.fields}>
                                <div className={styles.field}>
                                    <UserIcon className={styles.field_icon} />
                                    <div className={styles.field_info}>
                                        <p className={styles.field_title}>
                                            Имя пользователя:
                                        </p>
                                        <span className={styles.field_text}>
                                            {user.name}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <EmailIcon className={styles.field_icon} />

                                    <div className={styles.field_info}>
                                        <p className={styles.field_title}>
                                            Email адрес:
                                        </p>
                                        <span className={styles.field_text}>
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <PhoneIcon className={styles.field_icon} />

                                    <div className={styles.field_info}>
                                        <p className={styles.field_title}>
                                            Номер телефона:
                                        </p>
                                        <span className={styles.field_text}>
                                            {user.tel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <Button
                            theme={ButtonTheme.SIGNIN}
                            onClick={() => setEditing(true)}
                        >
                            Редактировать профиль
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
