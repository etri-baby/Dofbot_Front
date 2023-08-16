import axios from 'axios';
import {
    CARBONDIOXIDE_SENSOR,
    CHECK_PING,
    HUMIDITY_SENSOR,
    ILLUMINANCE_SENSOR,
    SOILHUMIDITY_SENSOR,
    TEMPERATURE_SENSOR,
} from './smart_farm_types';
import { SMART_FARM_SERVER } from '../components/Config.js';

export function getTemperature() {
    const request = axios.get(`${SMART_FARM_SERVER}/`);
    return {
        type: TEMPERATURE_SENSOR,
        payload: request,
    };
}

export function getHumidity() {
    const request = axios.get();
    return {
        type: HUMIDITY_SENSOR,
        payload: request,
    };
}

export function getIlluminance() {
    const request = axios.get();
    return {
        type: ILLUMINANCE_SENSOR,
        payload: request,
    };
}

export function getSoilhumidity() {
    const request = axios.get();
    return {
        type: SOILHUMIDITY_SENSOR,
        payload: request,
    };
}

export function getCarbondioxide() {
    const request = axios.get();
    return {
        type: CARBONDIOXIDE_SENSOR,
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
