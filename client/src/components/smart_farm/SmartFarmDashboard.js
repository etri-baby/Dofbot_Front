import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Temperature from '../utils/smart_farm_utils/Temperature';
import Humidity from '../utils/smart_farm_utils/Humidity';
import Illuminance from '../utils/smart_farm_utils/Illuminance';
import CarbonDioxide from '../utils/smart_farm_utils/CarbonDioxide';
import SoilHumidity from '../utils/smart_farm_utils/SoilHumidity';
import axios from 'axios';
import Buttons from '../utils/smart_farm_utils/Buttons';
import Camera from '../utils/Camera';

function SmartFarmDashboard() {
    const [iotKey, setIotKey] = useState('SmartFarm');
    const [intervalKey, setIntervalKey] = useState('1D');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [soilHumidityData, setSoilHumidityData] = useState([]);
    const [illuminanceData, setIlluminanceData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [currentTime]);

    useEffect(() => {
        let start = new Date();
        let end = new Date();
        if (intervalKey === '1D') {
            start = end;
        } else if (intervalKey === '1W') {
            start.setDate(start.getDate() - 6);
        } else if (intervalKey === '1M') {
            start.setMonth(start.getMonth() - 1);
        }
        start.setHours(0, 0, 0);
        end.setHours(23, 59, 59);

        const formattedStart = start.toISOString().split('T')[0];
        const formattedEnd = end.toISOString().split('T')[0];

        axios
            .get('/api/smartfarm/sensor/date', {
                params: {
                    start: formattedStart,
                    end: formattedEnd,
                },
            })
            .then((response) => {
                const sensorDataArray = response.data;

                const temperatureArray = [];
                const humidityArray = [];
                const soilHumidityArray = [];
                const illuminanceArray = [];

                sensorDataArray.forEach((item) => {
                    const [data, timestamp] = item;
                    const parsedData = JSON.parse(data);

                    temperatureArray.push({ temperature: parsedData.temperature, timestamp: timestamp });
                    humidityArray.push({ humidity: parsedData.humidity, timestamp: timestamp });
                    soilHumidityArray.push({ soilHumidity: parsedData.soilhumidity, timestamp: timestamp });
                    illuminanceArray.push({ illuminance: parsedData.illuminance, timestamp: timestamp });
                });

                setTemperatureData(temperatureArray);
                setHumidityData(humidityArray);
                setSoilHumidityData(soilHumidityArray);
                setIlluminanceData(illuminanceArray);
            })
            .catch((error) => {
                // 오류 처리 코드
            });
    }, [intervalKey]);

    const IoTcontainerStyle = {
        border: '2px solid #000', // 테두리 스타일 설정
        padding: '5px', // 내부 여백 설정
        borderRadius: '10px', // 테두리 곡선 설정
        width: '20vmax',
        margin: 'auto',
    };

    const dataIntervalContainerStyle = {
        border: '1px solid #000', // 테두리 스타일 설정
        padding: '5px', // 내부 여백 설정
        borderRadius: '10px', // 테두리 곡선 설정
        width: '10vmax',
        margin: 'auto',
    };

    const tabItemStyle = {
        color: 'black', // 선택되지 않은 탭의 글씨색
    };

    const activeTabItemStyle = {
        backgroundColor: 'black', // 선택된 탭의 배경색
        color: 'white', // 선택된 탭의 글씨색
    };

    const getFormattedTime = (date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        return date.toLocaleString('ko-KR', options);
    };

    return (
        <div className="custom-border">
            <div className="grid gap-x-4 gap-y-14 grid-cols-3 justify-items-stretch">
                <div>{/* Grid 0 */}</div>
                <div className="justify-self-start">
                    <div style={dataIntervalContainerStyle} className="d-flex justify-content-center">
                        <Tab.Container defaultActiveKey="1D">
                            <Row>
                                <Col>
                                    <Nav
                                        variant="pills"
                                        className="d-flex flex-row"
                                        onSelect={(eventKey) => {
                                            setIntervalKey(eventKey);
                                        }}
                                    >
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="1D"
                                                style={intervalKey === '1D' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                1D
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="1W"
                                                style={intervalKey === '1W' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                1W
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="1M"
                                                style={intervalKey === '1M' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                1M
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
                <div className="justify-self-end">
                    <Button
                        variant="dark"
                        className="custom-button"
                        onClick={() => {
                            // eslint-disable-next-line no-restricted-globals
                            location.reload();
                        }}
                    >
                        Refresh
                    </Button>
                </div>
            </div>
            <br />
            <div className="grid gap-x-4 gap-y-14 grid-cols-3 justify-items-stretch">
                <div>
                    <h2>{iotKey} Dashboard</h2>
                    <br />
                    <div style={IoTcontainerStyle} className="d-flex justify-content-center">
                        <Tab.Container defaultActiveKey="SmartFarm">
                            <Row>
                                <Col>
                                    <Nav
                                        variant="pills"
                                        className="d-flex flex-row"
                                        onSelect={(eventKey) => {
                                            const transformedKey = eventKey.toLowerCase().replace('smart', 'smart_');
                                            setIotKey(eventKey);
                                            navigate(`/${transformedKey}`);
                                        }}
                                        justify
                                    >
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="SmartFarm"
                                                style={iotKey === 'SmartFarm' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                SmartFarm
                                            </Nav.Link>
                                        </Nav.Item>
                                        {/* <Nav.Item>
                                            <Nav.Link
                                                eventKey="SmartHome"
                                                style={iotKey === 'SmartHome' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                SmartHome
                                            </Nav.Link>
                                        </Nav.Item> */}
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="SmartArm"
                                                style={iotKey === 'SmartArm' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                SmartArm
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                    <br />
                    <h3 className="d-none d-sm-block">{getFormattedTime(currentTime)}</h3>
                </div>
                <div className="custom-box">
                    <Temperature temperatureData={temperatureData} />
                </div>
                <div className="custom-box">
                    <Humidity humidityData={humidityData} />
                </div>
                <div></div>
                {/* <div className="custom-box">
                    <div className="grid grid-cols-2  justify-items-stretch">
                        <CustomFormControl title={'Temperature'} />
                        <CustomFormControl title={'Humidity'} />
                        <CustomFormControl title={'Illuminance'} />
                        <CustomFormControl title={'Soil Humidity'} />
                        <CustomFormControl title={'Carbon Dioxide'} />
                    </div>
                    <div className="d-flex justify-content-center" style={{ alignContent: 'end' }}>
                        <Button style={{ background: 'black', border: '1px solid black', marginRight: '1vmax' }}>
                            제출
                        </Button>
                        <Button style={{ background: 'black', border: '1px solid black' }}>초기화</Button>
                    </div>
                </div> */}
                <div className="custom-box">
                    <Illuminance illuminanceData={illuminanceData} />
                </div>
                <div className="custom-box">
                    <SoilHumidity soilHumidityData={soilHumidityData} />
                </div>
                <div className="custom-box">
                    <Camera />
                </div>
                <div className="custom-box">
                    <CarbonDioxide />
                </div>
                <div className="custom-box">
                    <p style={{ textAlign: 'left', fontSize: '24px', paddingLeft: '1vmax', fontWeight: 'bold' }}>
                        Actuator Control
                    </p>
                    <Buttons />
                </div>
            </div>
        </div>
    );
}

export default SmartFarmDashboard;

// function CustomFormControl(props) {
//     return (
//         <>
//             <h5 className="text-center">{props.title}</h5>
//             <div style={{ paddingLeft: '1vmax' }}>
//                 <Form.Control type={props.title} id={props.title} style={{ width: '7vmax', height: '1.5vmax' }} />
//             </div>
//         </>
//     );
// }
