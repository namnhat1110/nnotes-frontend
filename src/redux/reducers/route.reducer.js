import * as types from "../constants/route.constant";

const initialState = {
  redirectTo: null,
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
};

export default routeReducer;
