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

export function TestMqttCon() {
  const [topic, setTopic] = useState("test");
  const [message, setMessage] = useState("Hi, Pi");

  const handlePostMessage = () => {
    const data = {
      topic: topic,
      message: message // 올바른 값을 가져오는지 확인하세요.
    };

    axios.post("/api/message", data)
      .then(response => {
        // Handle the response from the server if needed
        console.log("Message sent successfully!");
        console.log(response.data); // This will contain the response data from the server
      })
      .catch(error => {
        // Handle errors if the request fails
        console.error("Error sending message:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // 올바른 값을 설정하는지 확인하세요.
      />
      <button onClick={handlePostMessage}>메시지 전송</button>
    </div>
  );
}