import React,{useEffect, useState} from 'react'
import axios from "axios"

export default function TestPage() {
    const [str, setStr] = useState("")
    useEffect(() => {
    axios.get("/api/ping").then((response) => {
      setStr(response.data)
    })
  }, [])
  return (
    <div>{str}</div>
  )
}

export function TestGamepadConnect() {
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

    const gamepadLoop = setInterval(updateGamepadState, 100); // 100ms 간격으로 확인

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return () => {
      clearInterval(gamepadLoop);
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);

  const renderGamepadState = () => {
    if (!gamepadState) {
      return <div>No gamepad connected</div>;
    }

    const buttons = {};
    gamepadState.buttons.forEach((button, index) => {
      buttons[`button${index}`] = button.pressed;
    });

    const axes = {};
    gamepadState.axes.forEach((axis, index) => {
      axes[`axis${index}`] = axis;
    });

    return (
      <div>
        <h2>Gamepad State:</h2>
        <div>
          <h3>Buttons:</h3>
          <pre>{JSON.stringify(buttons, null, 2)}</pre>
        </div>
        <div>
          <h3>Axes:</h3>
          <pre>{JSON.stringify(axes, null, 2)}</pre>
        </div>
      </div>
    );
  };

  return <div>{renderGamepadState()}</div>;
}