import { combineReducers } from "redux";
import client from "./client_reducer";

const rootReducer = combineReducers({
    client,
});

export default rootReducer;