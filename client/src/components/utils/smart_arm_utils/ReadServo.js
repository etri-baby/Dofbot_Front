import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';

function ReadServo() {
    const [servoData, setServoData] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const brokerHost = '129.254.174.120';
        const brokerPort = 9002;
        const clientId = `mqtt_subscriber_${Math.random().toString(16).substr(2, 8)}`;
        const topic = 'jetson/read';

        const mqttClient = new Paho.Client(brokerHost, brokerPort, clientId);
        setClient(mqttClient);

        const connectOptions = {
            onSuccess: () => {
                console.log('READ MQTT 연결 성공');
                mqttClient.subscribe(topic);
            },
            onFailure: (error) => {
                console.error('MQTT 연결 실패', error);
                tryReconnect();
            },
        };

        const tryReconnect = () => {
            if (!mqttClient.isConnected()) {
                console.log('MQTT 재연결 시도...');
                mqttClient.connect(connectOptions);
            }
        };

        mqttClient.onMessageArrived = (message) => {
            setServoData(message.payloadString);
        };

        mqttClient.connect(connectOptions);

        mqttClient.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error(`MQTT 연결이 끊어졌습니다: ${responseObject.errorMessage}`);
                setTimeout(tryReconnect, 3000); // 3초 후 재연결 시도
            }
        };

        return () => {
            if (mqttClient.isConnected()) {
                mqttClient.disconnect();
                console.log('MQTT 연결 종료');
            }
        };
    }, []);

    // MqttCameraTry.js

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <h4>Servo</h4>
            <div style={{ maxWidth: '70%', maxHeight: '70%', width: '70%', height: '70%' }}>{servoData}</div>
        </div>
    );
}

export default ReadServo;
