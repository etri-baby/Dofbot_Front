import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

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
                <p className="subtitle">SERVO 1</p>
                {/* servo1 왼쪽으로(로봇팔 왼쪽 회전) */}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleAxisPress('0', -1)}
                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                >
                    <ArrowCircleLeftOutlinedIcon />
                </button>
                {/* servo1 오른쪽으로(로봇팔 오른쪽 회전) */}
                <button
                    className="right pad-buttons"
                    onMouseDown={() => handleAxisPress('0', 1)}
                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                >
                    <ArrowCircleRightOutlinedIcon />
                </button>
            </div>
            <div>
                <p className="subtitle">SERVO 2</p>
                {/* servo2의 각도 하강(로봇팔 하강)*/}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleAxisPress('1', -1)}
                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                >
                    <ArrowCircleDownOutlinedIcon />
                </button>

                {/* servo2의 각도 상승(로봇팔 상승)*/}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleAxisPress('1', 1)}
                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                >
                    <ArrowCircleUpOutlinedIcon />
                </button>
            </div>
            <div>
                {/* 왼쪽 뒷 버튼 1, 2 */}
                <p className="subtitle">SERVO 3</p>
                {/* Servo3 아래로(angle 하강) */}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleButtonPress('4')}
                    onMouseUp={() => handleButtonRelease('4')}
                >
                    <ArrowCircleDownOutlinedIcon />
                </button>
                {/* Servo3 위로(angle 상승) */}
                <button
                    className="right pad-buttons"
                    onMouseDown={() => handleButtonPress('6')}
                    onMouseUp={() => handleButtonRelease('6')}
                >
                    <ArrowCircleUpOutlinedIcon />
                </button>
            </div>
            <div>
                {/* 오른쪽 뒷 버튼 1, 2 */}
                <p className="subtitle">SERVO 4</p>
                {/* Servo4 아래로(angle 하강) */}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleButtonPress('5')}
                    onMouseUp={() => handleButtonRelease('5')}
                >
                    <ArrowCircleDownOutlinedIcon />
                </button>
                {/* Servo4 위로(angle 상승) */}
                <button
                    className="right pad-buttons"
                    onMouseDown={() => handleButtonPress('7')}
                    onMouseUp={() => handleButtonRelease('7')}
                >
                    <ArrowCircleUpOutlinedIcon />
                </button>
            </div>
            <div>
                <p className="subtitle">SERVO 5</p>
                {/* Servo5 왼쪽 회전(angle 상승) */}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleButtonPress('1')}
                    onMouseUp={() => handleButtonRelease('1')}
                >
                    <ArrowCircleLeftOutlinedIcon />
                </button>
                {/* Servo5 오른쪽 회전(angle 하강) */}
                <button
                    className="right pad-buttons"
                    onMouseDown={() => handleButtonPress('3')}
                    onMouseUp={() => handleButtonRelease('3')}
                >
                    <ArrowCircleRightOutlinedIcon />
                </button>
            </div>
            <div>
                <p className="subtitle">SERVO 6</p>
                {/* 집기 */}
                <button
                    className="left pad-buttons"
                    onMouseDown={() => handleButtonPress('0')}
                    onMouseUp={() => handleButtonRelease('0')}
                >
                    PICK
                </button>
                {/* 놓기 */}
                <button
                    className="right pad-buttons"
                    onMouseDown={() => handleButtonPress('2')}
                    onMouseUp={() => handleButtonRelease('2')}
                >
                    DROP
                </button>
            </div>
            <div></div>
            <div></div>
            <div className="grid place-items-end" style={{ padding: '20px' }}>
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
