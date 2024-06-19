import { type ReactNode } from "react";
import styles from "./GlobalLayout.module.scss";
import { Header } from "widgets/Header";
interface LayoutProps {
    children: ReactNode;
}

export const GlobalLayout = (props: LayoutProps) => {
    const { children } = props;
    return (
        <>
            <Header />
            <section className={styles.content_wrapper}>{children}</section>
        </>
    );
};
