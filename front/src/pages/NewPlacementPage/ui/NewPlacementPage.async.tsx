import { lazy } from "react";

export const NewPlacementPageAsync = lazy(
    async () => await import("./NewPlacementPage")
);
