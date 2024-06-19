import { useUserStore } from "entities/User";
import { useEffect } from "react";
import { AppRouter } from "./providers/routerProvider/AppRouter";

function App() {
    const isLoading = useUserStore((state) => state.isLoading);
    const fetchUser = useUserStore((state) => state.fetchUser);
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    if (!isLoading) {
        return (
            <div className="app">
                <main className="content">
                    <AppRouter />
                </main>
            </div>
        );
    }
}

export default App;
