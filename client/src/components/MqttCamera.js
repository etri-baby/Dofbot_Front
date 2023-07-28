import React, { useEffect, useState } from 'react';
import Paho, { Client } from 'paho-mqtt'

function MqttCamera() {
  const [mqttClient, setMqttClient] = useState(null);
  const reconnectTimeout = 2000;  
  const host = '129.254.174.120';
  const port = 1883;

  useEffect(() => {
    MQTTconnect();
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

    // 콜백 함수
    const onConnect = () => {
    console.log('접속완료');
    mqttClient.subscribe('web');
    const message = new Paho.MQTT.Message('start');
    // topic 설정
    message.destinationName = 'jetson/camera';
    // mqtt 메시지 보내기 - publish
    mqttClient.send(message);
  };

  const onFailure = (message) => {
    console.log(`접속실패: ${host}, ${port}`);
    setTimeout(MQTTconnect, reconnectTimeout);
  };

  const onMessageArrived = (msg) => {
    let out_msg = `메시지전달: ${msg.payloadString}<br/>`;
    out_msg = out_msg + `msg topic: ${msg.destinationName}`;
    console.log(out_msg);
  };

  const MQTTconnect = () => {
    console.log(`mqtt접속: ${host}, ${port}`);
    // 클라이언트 오브젝트 생성
    const client = new Paho.MQTT.Client(host, port, 'react_client');
    const options = {
      timeout: 3,
      onSuccess: onConnect,
      onFailure: onFailure,
    };
    client.onMessageArrived = onMessageArrived;
    client.connect(options); // connect
    setMqttClient(client);
  };

  return (
    <div>
      <h1>MQTT와 웹소켓 테스트</h1>
      <img src="" id="myimg" />
    </div>
  );
};

export default MqttCamera;