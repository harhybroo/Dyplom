import { useUserStore } from "entities/User";
import { useEffect } from "react";
import { ProfileDetails } from "widgets/ProfileDetails";

export const ViewProfilePage = () => {
    const fetchUser = useUserStore((state) => state.fetchUser);
    const isLoading = useUserStore((state) => state.isLoading);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    if (!isLoading) {
        return (
            <>
                <ProfileDetails />
            </>
        );
    }
};
export default ViewProfilePage;
