import { useUserStore } from "../store/UserStore";

const useAuthSelector = () => {
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);
    const isAuth = user !== null && !isLoading;
    return isAuth;
};

export default useAuthSelector;
