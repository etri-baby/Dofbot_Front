import axios from "axios";
import {
    CHECK_PING,
} from "./smart_arm_types";
import { SMART_ARM_SERVER } from "../components/Config.js";

export function checkServo() {
    const request = axios
        .get(`${SMART_ARM_SERVER}/ping`)
        .then((response) => response.data);

    return {
        type: CHECK_PING,
        payload: request,
    };
}

// export function postExample(dataToSubmit) {
//     const request = axios
//         .post(`${CLIENT_SERVER}/login`, dataToSubmit)
//         .then((response) => response.data);

//     return {
//         type: LOGIN_USER,
//         payload: request,
//     };
// }

