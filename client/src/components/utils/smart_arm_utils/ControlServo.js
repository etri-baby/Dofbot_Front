import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ControlServo() {
    const initialAxes = {
        0: -0.0039,
        1: -0.0039,
        2: 0.0039,
        5: 0.0039,
    };

    const initialButtons = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    };

    const [axes, setAxes] = useState(initialAxes);
    const [buttons, setButtons] = useState(initialButtons);
    const [isSending, setIsSending] = useState(false);

    const handleAxisPress = (axis, value) => {
        setAxes((prevAxes) => ({
            ...prevAxes,
            [axis]: parseFloat(value),
        }));
        setIsSending(true);
    };

    const handleAxisRelease = (axis, value) => {
        setAxes((prevAxes) => ({
            ...prevAxes,
            [axis]: parseFloat(value),
        }));
        setIsSending(false);
        sendDefaultGamepadInput();
    };

    const handleButtonPress = (button) => {
        setButtons((prevButtons) => ({
            ...prevButtons,
            [button]: true,
        }));
        setIsSending(true);
    };

    const handleButtonRelease = (button) => {
        setButtons((prevButtons) => ({
            ...prevButtons,
            [button]: false,
        }));
        setIsSending(false);
        sendDefaultGamepadInput();
    };

    const sendGamepadInput = async () => {
        try {
            const formattedAxes = Object.entries(axes)
                .map(([key, value]) => `axis_${key}=${value}`)
                .join('&');

            const formattedButtons = Object.entries(buttons)
                .map(([key, value]) => `button_${key}=${value}`)
                .join('&');

            const queryString = `${formattedAxes}&${formattedButtons}`;

            const response = await axios.post(`/api/smartarm/send_pad_data?${queryString}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending gamepad input:', error);
        }
    };

    const sendDefaultGamepadInput = async () => {
        try {
            const formattedAxes = Object.entries(initialAxes)
                .map(([key, value]) => `axis_${key}=${value}`)
                .join('&');

            const formattedButtons = Object.entries(initialButtons)
                .map(([key, value]) => `button_${key}=${value}`)
                .join('&');

            const queryString = `${formattedAxes}&${formattedButtons}`;

            const response = await axios.post(`/api/smartarm/send_pad_data?${queryString}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending gamepad input:', error);
        }
    };

    useEffect(() => {
        if (isSending) {
            sendGamepadInput();
        }
    }, [axes, buttons, isSending]);

    return (
        <div className="grid grid-rows-3 grid-cols-3 grid-flow-row gap-x-4 gap-y-4">
            <div>
                {/* servo1 왼쪽으로(로봇팔 왼쪽 회전) */}
                <button
                    className="button-left"
                    onMouseDown={() => handleAxisPress('0', -1)}
                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                >
                    ←
                </button>
                {/* servo1 오른쪽으로(로봇팔 오른쪽 회전) */}
                <button
                    className="button-right"
                    onMouseDown={() => handleAxisPress('0', 1)}
                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                >
                    →
                </button>
            </div>
            <div>
                {/* servo2의 각도 하강(로봇팔 하강)*/}
                <button
                    className="button-up"
                    onMouseDown={() => handleAxisPress('1', -1)}
                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                >
                    ↑
                </button>

                {/* servo2의 각도 상승(로봇팔 상승)*/}
                <button
                    className="button-down"
                    onMouseDown={() => handleAxisPress('1', 1)}
                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                >
                    ↓
                </button>
            </div>
            <div>
                {/* 왼쪽 뒷 버튼 1, 2 */}
                <button
                    className="button-4"
                    onMouseDown={() => handleButtonPress('4')}
                    onMouseUp={() => handleButtonRelease('4')}
                >
                    {/* Servo3 아래로(angle 하강) */}L1
                </button>

                <button
                    className="button-4"
                    onMouseDown={() => handleButtonPress('6')}
                    onMouseUp={() => handleButtonRelease('6')}
                >
                    {/* Servo3 위로(angle 상승) */}L2
                </button>
            </div>
            <div>
                {/* 오른쪽 뒷 버튼 1, 2 */}
                <button
                    className="button-4"
                    onMouseDown={() => handleButtonPress('5')}
                    onMouseUp={() => handleButtonRelease('5')}
                >
                    {/* Servo4 아래로(angle 하강) */}R1
                </button>

                <button
                    className="button-4"
                    onMouseDown={() => handleButtonPress('7')}
                    onMouseUp={() => handleButtonRelease('7')}
                >
                    {/* Servo4 위로(angle 상승) */}R2
                </button>
            </div>
            <div>
                <button
                    className="button-2"
                    onMouseDown={() => handleButtonPress('1')}
                    onMouseUp={() => handleButtonRelease('1')}
                >
                    {/* Servo5 왼쪽 회전(angle 상승) */} 2
                </button>

                <button
                    className="button-4"
                    onMouseDown={() => handleButtonPress('3')}
                    onMouseUp={() => handleButtonRelease('3')}
                >
                    {/* Servo5 오른쪽 회전(angle 하강) */}4
                </button>
            </div>
            <div>
                {/* 집기 */}
                <button
                    className="button-1"
                    onMouseDown={() => handleButtonPress('0')}
                    onMouseUp={() => handleButtonRelease('0')}
                >
                    1
                </button>

                <button
                    className="button-3"
                    onMouseDown={() => handleButtonPress('2')}
                    onMouseUp={() => handleButtonRelease('2')}
                >
                    {/* 놓기 */}3
                </button>
            </div>
            <div></div>
            <div></div>
            <div>
                <button
                    className="button-select"
                    onMouseDown={() => handleButtonPress('8')}
                    onMouseUp={() => handleButtonRelease('8')}
                >
                    {/* 초기화 */}
                    RESET
                </button>
            </div>
        </div>
    );
}

export default ControlServo;
