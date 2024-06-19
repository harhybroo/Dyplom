import { useUserStore } from "../store/UserStore";

const useAdminSelector = () => {
    const user = useUserStore((state) => state.user);
    const isLoading = useUserStore((state) => state.isLoading);
    const isAdmin = !isLoading && user.id === 2;
    return isAdmin;
};

export default useAdminSelector;
