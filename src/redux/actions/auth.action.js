import * as types from '../constants/auth.constant';
import api from "../../apiService";
import { toast } from 'react-toastify';

const login = (user) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/auth/login`;

        const data = await api.post(url, user);
        console.log("hahaha", data);

        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: data.data
        });
        api.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.accessToken;
        window.location.href = "https://nnotes-editor.netlify.app/"

    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.LOGIN_FAILURE, payload: error });
    }

};

const register = (user) => async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/auth/signup`;

        const data = await api.post(url, user);
        console.log("hahaha", data);

        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: data
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.REGISTER_FAILURE, payload: error });
    }

};

const logout = () => (dispatch) => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.setItem('accessToken', '');
    dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = { register, login, logout };
export default authActions;