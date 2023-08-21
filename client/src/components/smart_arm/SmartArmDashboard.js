import React, { useState, useEffect } from 'react';
import './Gamepad.css'; // 스타일링을 위한 CSS 파일
import { Col, Row, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Camera from '../utils/Camera';
import ReadServo from '../utils/smart_arm_utils/ReadServo';
import ControlServo from '../utils/smart_arm_utils/ControlServo';

export default function SmartArmDashboard() {
    const [iotKey, setIotKey] = useState('SmartArm');
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

    return (
        <div className="custom-border">
            <div className="grid grid-rows-2  gap-4">
                <div className="row-span-1">
                    <div>
                        <h2>{iotKey} Dashboard</h2>
                        <br />
                        <div style={IoTcontainerStyle} className="d-flex justify-content-center">
                            <Tab.Container defaultActiveKey="SmartArm">
                                <Row>
                                    <Col>
                                        <Nav
                                            variant="pills"
                                            className="d-flex flex-row"
                                            onSelect={(eventKey) => {
                                                const transformedKey = eventKey
                                                    .toLowerCase()
                                                    .replace('smart', 'smart_');
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
                </div>
                <div className="row-span-1 arm-custom-box justify-center">
                    <ControlServo />
                </div>
                <div className="row-span-1 arm-custom-box justify-center">
                    <Camera />
                </div>
            </div>
            <br />
            <ReadServo />
        </div>
    );
}

const IoTcontainerStyle = {
    border: '2px solid #000', // 테두리 스타일 설정
    padding: '5px', // 내부 여백 설정
    borderRadius: '10px', // 테두리 곡선 설정
    width: '20vmax',
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
