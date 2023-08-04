import { combineReducers } from "redux";
import smart_arm_reducer from "./smart_arm_reducer";
import smart_farm_reducer from "./smart_farm_reducer";
import smart_home_reducer from "./smart_home_reducer";

const rootReducer = combineReducers({
    smart_arm_reducer,
    smart_farm_reducer,
    smart_home_reducer,
});

export default rootReducer;