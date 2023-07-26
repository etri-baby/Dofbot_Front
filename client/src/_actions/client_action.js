import axios from "axios";
import {
    CHECK_SERVO
} from "./types";
import { CLIENT_SERVER } from "../components/Config.js";

export function checkServo() {
    const request = axios
        .get(`${CLIENT_SERVER}/check`)
        .then((response) => response.data);

    return {
        type: CHECK_SERVO,
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

