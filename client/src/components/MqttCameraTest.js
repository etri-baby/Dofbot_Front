import React, { useState } from 'react';
import Websocket from 'react-websocket';

function MqttCameraTest() {
  const [imageData, setImageData] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Not Connected');

  const handleData = (data) => {
    setImageData(data);
    console.log("received data")
  };

  const handleOpen = () => {
    setConnectionStatus('Connected');
  };

  const handleClose = () => {
    setConnectionStatus('Disconnected');
  };

  return (
    <div>
      <h1>WebSocket Image Receiver</h1>
      <p>Connection Status: {connectionStatus}</p>
      <Websocket
        url="ws://129.254.174.120:9002"
        onMessage={handleData}
        onOpen={handleOpen}
        onClose={handleClose}
      />

      {imageData && (
        <img src={`data:image/jpeg;base64, ${imageData}`} alt="Received" />
      )}
    </div>
  );
}

export default MqttCameraTest;