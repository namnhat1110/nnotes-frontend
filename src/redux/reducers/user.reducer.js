import * as types from "../constants/user.constant";

const initialState = {
    currentUser: null,
    loading: false,

};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.GET_USER_REQUEST:
            return { ...state, loading: true };
        case types.GET_USER_SUCCESS:
            return { ...state, currentUser: payload, loading: false };
        case types.GET_USER_FAILURE:
            return { ...state, loading: false };

        case types.UPDATE_USER_REQUEST:
            return { ...state, loading: true };
        case types.UPDATE_USER_SUCCESS:
            return { ...state, currentUser: payload, loading: false };
        case types.UPDATE_USER_FAILURE:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default userReducer;
