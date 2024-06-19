import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
    AppRouterProps,
    RoutesConfig,
} from "shared/config/routerConfig/routerConfig";
import { GlobalLayout } from "shared/layouts/globalLayout/GlobalLayout";
import { PageLoader } from "widgets/PageLoader";
import { AuthedRedirect } from "./AuthedRedirect";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <GlobalLayout>{route.element}</GlobalLayout>
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        <AuthedRedirect>{element}</AuthedRedirect>
                    )
                }
            />
        );
    }, []);
    return (
        <Routes>{Object.values(RoutesConfig).map(renderWithWrapper)}</Routes>
    );
};
