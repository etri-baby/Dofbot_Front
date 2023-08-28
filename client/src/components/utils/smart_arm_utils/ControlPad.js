import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function ControlPad() {
    const [gamepadState, setGamepadState] = useState(null);

    useEffect(() => {
        const updateGamepadState = () => {
            const gamepads = navigator.getGamepads();
            if (!gamepads) return;

            const gamepad = gamepads[0];
            setGamepadState(gamepad);
        };

        const handleGamepadConnected = () => {
            console.log('Gamepad connected');
            updateGamepadState();
        };

        const handleGamepadDisconnected = () => {
            console.log('Gamepad disconnected');
            setGamepadState(null);
        };

        const gamepadLoop = setInterval(updateGamepadState, 100);

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        return () => {
            clearInterval(gamepadLoop);
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);

    const sendGamepadDataToServer = async () => {
        if (!gamepadState) return;

        try {
            const buttons = {};
            gamepadState.buttons.forEach((button, index) => {
                buttons[`button_${index}`] = button.pressed ? true : false;
            });

            const axes = {};
            gamepadState.axes.forEach((axis, index) => {
                axes[`axis_${index}`] = axis;
            });

            const queryString = new URLSearchParams({
                ...axes,
                ...buttons,
            }).toString();

            await axios.post(process.env.REACT_APP_SERVER + `/api/smartarm/send_pad_data?${queryString}`);
        } catch (error) {
            console.error('Error sending gamepad data:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(sendGamepadDataToServer, 100);

        return () => clearInterval(interval);
    }, [gamepadState]);

    const renderGamepadState = () => {
        if (!gamepadState) {
            return <div>No gamepad connected</div>;
        }

        return (
            <div>
                <div>
                    <h3>패드 연결 완료: {gamepadState.id}</h3>
                </div>
            </div>
        );
    };

    return <div>{renderGamepadState()}</div>;
}
