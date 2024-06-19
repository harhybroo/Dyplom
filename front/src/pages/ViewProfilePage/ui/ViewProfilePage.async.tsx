import { lazy } from "react";

export const ViewProfilePageAsync = lazy(
    async () => await import("./ViewProfilePage")
);
