import React, { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
import { Table } from 'react-bootstrap';

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
                setTimeout(tryReconnect, 3000);
            }
        };

        return () => {
            if (mqttClient.isConnected()) {
                mqttClient.disconnect();
                console.log('MQTT 연결 종료');
            }
        };
    }, []);

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
            <div className="servo-table">
                <Table bordered>
                    <tbody>
                        <tr>
                            <td>SERVO 1</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[0] + '°'}</td>
                        </tr>
                        <tr>
                            <td>SERVO 2</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[1] + '°'}</td>
                        </tr>
                        <tr>
                            <td>SERVO 3</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[2] + '°'}</td>
                        </tr>
                        <tr>
                            <td>SERVO 4</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[3] + '°'}</td>
                        </tr>
                        <tr>
                            <td>SERVO 5</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[4] + '°'}</td>
                        </tr>
                        <tr>
                            <td>SERVO 6</td>
                            <td>{servoData.length === 0 ? 'NaN' : servoData[5] + '°'}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ReadServo;
