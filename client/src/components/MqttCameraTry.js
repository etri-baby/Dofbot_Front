import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';

function MqttCameraTry() {
  const [imageData, setImageData] = useState(''); // 이미지 데이터 상태

  useEffect(() => {
    // MQTT 브로커 정보 설정
    const brokerHost = '129.254.174.120';
    const brokerPort = 9002;
    const clientId = `mqtt_subscriber_${Math.random().toString(16).substr(2, 8)}`;
    const topic = 'my/topic'; // 구독할 토픽

    // MQTT 클라이언트 생성
    const client = new Paho.Client(brokerHost, brokerPort, clientId);

    // 메시지 수신 시 처리
    client.onMessageArrived = (message) => {
        console.log("1")
      setImageData(message.payloadString); // 이미지 데이터 업데이트
    };

    // MQTT 연결 및 토픽 구독
    client.connect({
      onSuccess: () => {
        console.log('MQTT 연결 성공');
        client.subscribe(topic); // 토픽 구독
      },
      onFailure: (error) => {
        console.error('MQTT 연결 실패', error);
      },
    });

    // 컴포넌트 언마운트 시 MQTT 연결 해제
    return () => {
      if (client.isConnected()) {
        client.disconnect();
        console.log('MQTT 연결 종료');
      }
    };
  }, []);

  return (
    <div>
      <h1>MQTT Subscriber & Streaming Example</h1>
      {/* imageData 상태에 있는 이미지 데이터를 img 태그의 src 속성에 지정 */}
      <img src={`data:image/jpeg;base64, ${imageData}`} alt="Received" />
    </div>
  );
}

export default MqttCameraTry;
