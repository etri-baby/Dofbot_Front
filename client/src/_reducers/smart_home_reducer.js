import {
    CHECK_PING,
} from "../_actions/smart_home_types";

export default function (state = {}, action) {
    switch (action.type) {
        case CHECK_PING:
            return { ...state, check: action.payload };
    
        default:
            return state;
    }
}
