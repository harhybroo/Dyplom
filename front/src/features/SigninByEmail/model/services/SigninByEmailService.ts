import { $api } from "shared/api/api";
import { LOCALSTORAGE_TOKEN_KEY } from "shared/const/localstorage";
import { SigninByEmailProps } from "../type/SigninByEmailType";

export const SigninByEmailService = async (props: SigninByEmailProps) => {
    const { email, password } = props;
    const params = {
        email: email,
        password: password,
    };
    try {
        const response = await $api.post("/auth/login", params);
        const token = response.data.token;
        window.localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    } catch (err) {
        err;
    }
};
