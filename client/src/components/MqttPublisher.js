import React from 'react';
import Paho from 'paho-mqtt';

class MqttPublisher extends React.Component {
  componentDidMount() {
    // MQTT 브로커 정보 설정
    const brokerHost = '129.254.174.120';
    const brokerPort = 9002;
    const clientId = `mqtt_publisher_${Math.random().toString(16).substr(2, 8)}`;
    const topic = 'my/topic'; // 발행할 토픽

    // MQTT 클라이언트 생성
    const client = new Paho.Client(brokerHost, brokerPort, clientId);
    
    // 연결 후 발행
    client.connect({
      onSuccess: () => {
        console.log('MQTT 연결 성공');
        const message = new Paho.Message('Hello, MQTT!'); // 발행할 메시지
        message.destinationName = topic; // 토픽 설정
        client.send(message); // 메시지 발행
        console.log('메시지 발행 완료');
        client.disconnect(); // 연결 종료
        console.log('MQTT 연결 종료');
      },
      onFailure: (error) => {
        console.error('MQTT 연결 실패', error);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>MQTT Publisher Example</h1>
      </div>
    );
  }
}

export default MqttPublisher;