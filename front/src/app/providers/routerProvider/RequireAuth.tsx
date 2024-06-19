import { useAuthSelector } from "entities/User";
import { Navigate, useLocation } from "react-router-dom";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useAuthSelector();
    const location = useLocation();
    if (!auth) {
        return (
            <Navigate
                to={RouterPath.signin}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};
