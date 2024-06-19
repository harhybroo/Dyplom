import { CreatePlacementPage } from "pages/CreatePlacementPage";
import { MainPage } from "pages/MainPage";
import { NewPlacementPage } from "pages/NewPlacementPage";
import { SignInPage } from "pages/SignInPage";
import { SignUpPage } from "pages/SignUpPage";
import { ViewPlacementPage } from "pages/ViewPlacementPage";
import { ViewProfilePage } from "pages/ViewProfilePage";
import { type RouteProps } from "react-router-dom";

export type AppRouterProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = "main",
    SIGNIN = "signin",
    SIGNUP = "signup",
    CREATE_PLACEMENT = "create_placement",
    NEW_PLACEMENTS = "new_placements",
    VIEW = "view",
    PROFILE = "profile",
}

export const RouterPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.SIGNIN]: "/signin",
    [AppRoutes.CREATE_PLACEMENT]: "/create",
    [AppRoutes.NEW_PLACEMENTS]: "/newplacements",
    [AppRoutes.VIEW]: "/view/:id",
    [AppRoutes.PROFILE]: "/profile",
};

export const RoutesConfig: Record<AppRoutes, AppRouterProps> = {
    [AppRoutes.MAIN]: {
        path: RouterPath.main,
        element: <MainPage />,
    },
    [AppRoutes.SIGNUP]: {
        path: RouterPath.signup,
        element: <SignUpPage />,
    },
    [AppRoutes.SIGNIN]: {
        path: RouterPath.signin,
        element: <SignInPage />,
    },
    [AppRoutes.VIEW]: {
        path: RouterPath.view,
        element: <ViewPlacementPage />,
    },
    [AppRoutes.CREATE_PLACEMENT]: {
        path: RouterPath.create_placement,
        element: <CreatePlacementPage />,
        authOnly: true,
    },
    [AppRoutes.NEW_PLACEMENTS]: {
        path: RouterPath.new_placements,
        element: <NewPlacementPage />,
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: RouterPath.profile,
        element: <ViewProfilePage />,
        authOnly: true,
    },
};
