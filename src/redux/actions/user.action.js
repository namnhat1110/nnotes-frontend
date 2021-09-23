import { toast } from "react-toastify";
import * as types from "../constants/user.constant";
import api from "../../apiService";


const getCurrentUser = () => async (dispatch) => {
    dispatch({ type: types.GET_USER_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/user/me`;
        const data = await api.get(url);
        dispatch({
            type: types.GET_USER_SUCCESS,
            payload: data.data.user,
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.GET_USER_FAILURE, payload: error });
    }
};

const updateCurrentUser = (user, userId) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USER_REQUEST, payload: null });
    try {
        let url = `${process.env.REACT_APP_BACKEND_API}api/notes/${userId}`;
        const data = await api.put(url, user);
        console.log("hahaha", data);

        dispatch({
            type: types.UPDATE_USER_SUCCESS,
            payload: data
        });
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: types.UPDATE_USER_FAILURE, payload: error });
    }
};

const userActions = { getCurrentUser, updateCurrentUser };
export default userActions;
