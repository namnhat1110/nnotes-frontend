import { combineReducers } from "redux";
import noteReducer from "./note.reducer";
import userReducer from "./user.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
    noteReducer: noteReducer,
    authReducer: authReducer,
    userReducer: userReducer
});
