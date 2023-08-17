import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
import Spinner from 'react-bootstrap/Spinner';

function MqttCameraTry() {
    const [imageData, setImageData] = useState('');
    const [client, setClient] = useState(null);
    const [con, setCon] = useState(false);

    useEffect(() => {
        const brokerHost = '129.254.174.120';
        const brokerPort = 9002;
        const clientId = `mqtt_subscriber_${Math.random().toString(16).substr(2, 8)}`;
        const topic = 'jetson/camera';

        const mqttClient = new Paho.Client(brokerHost, brokerPort, clientId);
        setClient(mqttClient);

        const connectOptions = {
            onSuccess: () => {
                console.log('MQTT 연결 성공');
                setCon(true);
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
            setImageData(message.payloadString);
        };

        mqttClient.connect(connectOptions);

        mqttClient.onConnectionLost = (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.error(`MQTT 연결이 끊어졌습니다: ${responseObject.errorMessage}`);
                setCon(false);
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
            <h4>Camera</h4>
            {con === false || imageData === '' ? (
                <Spinner animation="border" role="status" style={{ padding: '1vmax' }}>
                    <span className="visually-hidden">카메라 불러오는 중...</span>
                </Spinner>
            ) : (
                <div style={{ maxWidth: '70%', maxHeight: '70%', width: '70%', height: '70%' }}>
                    <img
                        src={`data:image/jpeg;base64, ${imageData}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: '100%',
                            height: '100%',

                            border: '1',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default MqttCameraTry;
