import * as types from "../constants/route.constant";

const redirect = (link) => ({ type: types.SET_REDIRECT_TO, payload: link });

export const routeActions = {
  redirect,
};
