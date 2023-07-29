import * as api from "../api";
import { LOGIN } from "../constants/actionTypes.js";

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.login(formData);

        dispatch({
            type: LOGIN,
            data
        });

        navigate("/");
    } catch (error) {
        console.log("error", error);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.signup(formData);

        dispatch({
            type: LOGIN,
            data
        });

        navigate("/");
    } catch (error) {
        console.log("error", error);
    }
};