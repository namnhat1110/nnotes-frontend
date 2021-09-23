import * as types from "../constants/auth.constant";
const isAuthenticated = !!localStorage.getItem("accessToken");

const initialState = {
    user: {},
    isAuthenticated,
    loading: false,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOGIN_REQUEST:
            return { ...state, loading: true };
        case types.LOGIN_SUCCESS:
            return { ...state, user: payload, loading: false };
        case types.LOGIN_FAILURE:
            return { ...state, loading: false };

        case types.REGISTER_REQUEST:
            return { ...state, loading: true };
        case types.REGISTER_SUCCESS:
            return { ...state, user: payload, loading: false };
        case types.REGISTER_FAILURE:
            return { ...state, user: false };

        case types.LOGOUT:
            return {
                ...state,
                accessToken: null,
                isAuthenticated: false,
                user: null,
                loading: false
            };
        default:
            return state;
    }
};

export default authReducer;