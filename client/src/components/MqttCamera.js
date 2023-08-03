import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';

function MqttCamera() {
  const [mqttClient, setMqttClient] = useState(null);
  const [imageData, setImageData] = useState(''); // 이미지 데이터를 저장할 상태 변수
  const reconnectTimeout = 60;
  const host = '129.254.174.120';
  const port = 9002;

  useEffect(() => {
    MQTTconnect();
    return () => {
      if (mqttClient) {
        mqttClient.end();
        console.log("연결 끊김")
      }
    };
  }, []);

  // 콜백 함수
  function onConnect() {
    console.log('접속완료');
    mqttClient.subscribe('jetson/camera');
    console.log('구독 완료');
    
    const message = new Paho.MQTT.Message('start');
    // topic 설정
    message.destinationName = 'jetson/camera';
    // mqtt 메시지 보내기 - publish
    console.log("message send")
    mqttClient.send(message);
  };

  function onFailure(message){
    console.log(`접속실패: ${host}, ${port}`);
    setTimeout(MQTTconnect, reconnectTimeout);
  };

  function onMessageArrived(msg) {
    setImageData(msg.payloadString); // base64 인코딩된 이미지 데이터 설정
    console.log(msg.payloadString)
  }
  

  function MQTTconnect() {
    console.log(`mqtt접속: ${host}, ${port}`);
    // 클라이언트 오브젝트 생성
    const client = new Paho.Client(host, Number(port), 'react_client');
    const options = {
      timeout: 60,
      onSuccess: onConnect,
      onFailure: onFailure,
    };
    setMqttClient(client);
    client.onMessageArrived = onMessageArrived;
    client.connect(options); // connect
    setMqttClient(client);
    console.log(client)
    console.log("클라이언트 생성")
  };

  return (
    <div>
      <h1>MQTT와 웹소켓 테스트</h1>
      {/* imageData 상태에 있는 이미지 데이터를 img 태그의 src 속성에 지정 */}
      <img src={`data:image/jpeg;base64, ${imageData}`} id="myimg" alt="Received" />
    </div>
  );
}

export default MqttCamera;
