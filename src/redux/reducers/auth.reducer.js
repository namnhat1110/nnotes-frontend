import * as types from "../constants/auth.constant";
// const isAuthenticated = !!localStorage.getItem("accessToken");

const initialState = {
  user: {},
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, user: false };

    case types.GET_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.LOGOUT:
      return {
        ...state,
        accessToken: undefined,
        isAuthenticated: false,
        user: undefined,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
