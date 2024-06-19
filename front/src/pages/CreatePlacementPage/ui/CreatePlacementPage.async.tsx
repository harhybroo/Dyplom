import { lazy } from "react";

export const CreatePlacementPageAsync = lazy(
    async () => await import("./CreatePlacementPage")
);
