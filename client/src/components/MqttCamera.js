import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';

function MqttCamera() {
  const [mqttClient, setMqttClient] = useState(null);
  const [imageData, setImageData] = useState(''); // 이미지 데이터를 저장할 상태 변수
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
    mqttClient.subscribe('jetson/camera');
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
    // 이미지 데이터가 Base64로 인코딩되어 있다고 가정
    const receivedImageBase64 = msg.payloadString;
    console.log(receivedImageBase64)
    setImageData(receivedImageBase64); // 받은 이미지 데이터를 imageData 상태에 저장
  };
  

  const MQTTconnect = () => {
    console.log(`mqtt접속: ${host}, ${port}`);
    // 클라이언트 오브젝트 생성
    const client = new Paho.Client(host, port, 'react_client');
    const options = {
      timeout: 3,
      onSuccess: onConnect,
      onFailure: onFailure,
    };
    client.onMessageArrived = onMessageArrived;
    client.connect(options); // connect
    setMqttClient(client);
    console.log("클라이언트 생성")
  };

  return (
    <div>
      <h1>MQTT와 웹소켓 테스트</h1>
      {/* imageData 상태에 있는 이미지 데이터를 img 태그의 src 속성에 지정 */}
      <img src={`data:image/jpeg;base64, ${imageData}`} id="myimg" />
    </div>
  );
}

export default MqttCamera;
