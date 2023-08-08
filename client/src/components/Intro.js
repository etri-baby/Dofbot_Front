import React from 'react';
import MqttCameraTry from './smart_arm/MqttCameraTry';
import { TestGamepadConnect } from './smart_arm/TestPage';
function Intro() {
    return (
        <div>
            <h1>IoT</h1>
            <MqttCameraTry></MqttCameraTry>
            <TestGamepadConnect></TestGamepadConnect>
            <h1 class="text-3xl font-bole underline">Hello Tailwind</h1>
        </div>
    );
}

export default Intro;
