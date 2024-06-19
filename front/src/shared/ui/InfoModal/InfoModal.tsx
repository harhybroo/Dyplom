import { useRef, type ReactNode, useEffect, useCallback } from "react";
import styles from "./InfoModal.module.scss";

interface InfoModalProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    onClose?: () => void;
}

export const InfoModal = (props: InfoModalProps) => {
    const { children, className, onClose } = props;
    const modalRef = useRef(null);

    const handleClickOutside = useCallback(
        (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        },
        [onClose]
    );
    const stopPropagation = useCallback((event) => {
        event.stopPropagation();
    }, []);
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);
    return (
        <div
            ref={modalRef}
            className={`${styles.info} ${className}`}
            onMouseLeave={onClose}
            onClick={stopPropagation}
        >
            <div className={styles.info_wrapper}>{children}</div>
        </div>
    );
};
