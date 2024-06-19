export interface User {
    id: number;
    email: string;
    name: string;
    tel: string;
    favorite: string[];
}
export interface userState {
    user: User;
    isLoading: boolean;
    fetchUser: () => Promise<void>;
    logoutUser: () => void;
}
