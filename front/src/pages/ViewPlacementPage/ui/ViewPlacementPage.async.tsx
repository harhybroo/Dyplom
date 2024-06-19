import { lazy } from "react";

export const ViewPlacementPageAsync = lazy(
    async () => await import("./ViewPlacementPage")
);
