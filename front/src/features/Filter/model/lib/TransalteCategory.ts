export const translateCategory = (value: string) => {
    if (value === "Квартиры") {
        return "placement";
    }
    if (value === "Гаражи") {
        return "garage";
    }
    if (value === "Склады") {
        return "storage";
    }
    if (value === "Офисы") {
        return "office";
    }
    if (value === "Торговые") {
        return "trading";
    }
    if (value === "Избранное") {
        return "favorite";
    }
};
export const reverseTranslateCategory = (value: string) => {
    if (value === "placement") {
        return "Квартиры";
    }
    if (value === "garage") {
        return "Гаражи";
    }
    if (value === "storage") {
        return "Склады";
    }
    if (value === "office") {
        return "Офисы";
    }
    if (value === "trading") {
        return "Торговые";
    }
    if (value === "favorite") {
        return "Избранное";
    }
};
