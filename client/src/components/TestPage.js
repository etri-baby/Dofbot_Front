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

  const sendGamepadDataToServer = async () => {
    if (!gamepadState) return; // Don't send data if no gamepad is connected

    try {
      const buttons = {};
      gamepadState.buttons.forEach((button, index) => {
        buttons[`button_${index}`] = button.pressed ? true : false;
      });

      const axes = {};
      gamepadState.axes.forEach((axis, index) => {
        axes[`axis_${index}`] = axis;
      });

      // Send the gamepad data to the server as URL query parameters
      const queryString = new URLSearchParams({
        ...axes,
        ...buttons,
      }).toString();

      const response = await axios.post(`/api/mqtt/send_pad_data?${queryString}`);

      console.log(response.data); // Log the server's response (optional)
    } catch (error) {
      console.error('Error sending gamepad data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(sendGamepadDataToServer, 100); // 100ms interval to send data

    return () => clearInterval(interval);
  }, [gamepadState]);

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
      message: message,
      retained: false, // Set to true if you want the message to be retained
      qos: 0, // Set the Quality of Service (QoS) level (0, 1, or 2)
    };

    axios.post("/api/mqtt/publish", null, {
      params: data, // Pass the data as query parameters
    })
      .then(response => {
        console.log("메시지 전송 성공!");
        console.log(response.data);
      })
      .catch(error => {
        console.error("메시지 전송 오류:", error);
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
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handlePostMessage}>메시지 전송</button>
    </div>
  );
}



