import * as types from "../constants/route.constant";

const redirect = (link) => ({ type: types.SET_REDIRECT_TO, payload: link });

const routeActions = {
    redirect,
};

export default routeActions;