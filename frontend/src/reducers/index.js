import userReducer from "./users";
import joinReducer from "./join";
import loginReducer from "./login";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    users: userReducer,
    join: joinReducer,
    login: loginReducer
});

export default allReducers;
