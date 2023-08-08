import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Col, Row, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SmartFarmDashboard() {
    const [iotKey, setIotKey] = useState('SmartFarm');
    const [intervalKey, setIntervalKey] = useState('1D');
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [currentTime]);

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
                        <Tab.Container defaultActiveKey="SmartFarm">
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
                            navigate('/smart_farm');
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
                                            setIotKey(eventKey);
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
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="SmartHome"
                                                style={iotKey === 'SmartHome' ? activeTabItemStyle : tabItemStyle}
                                            >
                                                SmartHome
                                            </Nav.Link>
                                        </Nav.Item>
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
                    <h3>{getFormattedTime(currentTime)}</h3>
                </div>
                <div className="custom-box">Temperature</div>
                <div className="custom-box">Humidity</div>
                <div className="custom-box">Auto Control</div>
                <div className="custom-box">Illuminance</div>
                <div className="custom-box">Soil Humidity</div>
                <div className="custom-box">Streaming</div>
                <div className="custom-box">Carbon Dioxide</div>
                <div className="custom-box">Buttons</div>
            </div>
        </div>
    );
}

export default SmartFarmDashboard;
