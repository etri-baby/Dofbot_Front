import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row, Tab, Nav } from 'react-bootstrap';

import Temperature from '../utils/smart_farm_utils/Temperature';
import Humidity from '../utils/smart_farm_utils/Humidity';
import Illuminance from '../utils/smart_farm_utils/Illuminance';
import CarbonDioxide from '../utils/smart_farm_utils/CarbonDioxide';
import SoilHumidity from '../utils/smart_farm_utils/SoilHumidity';
import axios from 'axios';
import Buttons from '../utils/smart_farm_utils/Buttons';
import Camera from '../utils/Camera';
import CustomTabContainer from '../utils/CustomTabContainer';

function SmartFarmDashboard() {
    const [intervalKey, setIntervalKey] = useState('1D');
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [soilHumidityData, setSoilHumidityData] = useState([]);
    const [illuminanceData, setIlluminanceData] = useState([]);

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
            .catch((error) => {});
    }, [intervalKey]);

    const dataIntervalContainerStyle = {
        border: '1px solid #000',
        padding: '5px',
        borderRadius: '10px',
        width: '10vmax',
        margin: 'auto',
    };

    const tabItemStyle = {
        color: 'black',
    };

    const activeTabItemStyle = {
        backgroundColor: 'black',
        color: 'white',
    };

    return (
        <div className="custom-border">
            <div className="gg grid gap-x-4 gap-y-14 grid-cols-3 justify-items-stretch">
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
            <div className="gg grid gap-x-4 gap-y-14 grid-cols-3 justify-items-stretch">
                <CustomTabContainer value={'SmartFarm'} />
                <div className="custom-box">
                    <Temperature temperatureData={temperatureData} />
                </div>
                <div className="custom-box">
                    <Humidity humidityData={humidityData} />
                </div>
                <div></div>
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
                    <p className="title">Actuator Control</p>
                    <Buttons />
                </div>
            </div>
        </div>
    );
}

export default SmartFarmDashboard;
