import {
    CHECK_SERVO,
} from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case CHECK_SERVO:
            return { ...state, check: action.payload };
    
        default:
            return state;
    }
}
