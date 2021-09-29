import * as types from "../constants/auth.constant";
import api from "../../apiService";
import { toast } from "react-toastify";
import { routeActions } from "./route.action";

const login = (user) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    let url = `${process.env.REACT_APP_BACKEND_API}api/auth/login`;

    const data = await api.post(url, user);
    console.log("hahaha", data);

    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: data.data,
    });
    api.defaults.headers.common["Authorization"] =
      "Bearer " + data.data.accessToken;
    localStorage.setItem("accessToken", data.data.accessToken);
    toast.success("Login successfully!");
    dispatch(routeActions.redirect(`/notes`));
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST, payload: null });
  try {
    if (accessToken)
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    let url = `${process.env.REACT_APP_BACKEND_API}api/user/me`;
    const data = await api.get(url);
    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.GET_USER_FAILURE, payload: error });
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
      payload: data,
    });
    toast.success("Register successfully!");
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = { getCurrentUser, register, login, logout };
export default authActions;
