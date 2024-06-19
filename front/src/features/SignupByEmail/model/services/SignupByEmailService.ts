import { $api } from "shared/api/api";
import { LOCALSTORAGE_TOKEN_KEY } from "shared/const/localstorage";
import { SignUpByEmailProps } from "../type/SignupByEmailType";

export const SignupByEmailService = async (props: SignUpByEmailProps) => {
    const { email, password, tel, name } = props;
    const params = {
        email: email,
        password: password,
        tel: tel,
        name: name,
        favorite: ["0"],
    };
    try {
        const response = await $api.post("/auth/register", params);
        const token = response.data.token;
        window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    } catch (err) {
        err;
    }
};
