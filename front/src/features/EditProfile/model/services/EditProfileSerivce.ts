import { $api } from "shared/api/api";
import { EditProfileSerivceProps } from "../types/EditProfileType";

export const EditProfileSerivce = async (props: EditProfileSerivceProps) => {
    const { userId, name, pass, email, tel } = props;
    if (pass === "") {
        const params = {
            name: name,
            email: email,
            tel: tel,
        };
        const response = $api.patch(`/users/${userId}`, params);
        return response;
    }
    if (pass !== "") {
        const params = {
            name: name,
            password: pass,
            email: email,
            tel: tel,
        };
        const response = $api.patch(`/users/${userId}`, params);
        return response;
    }
};
