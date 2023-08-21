import React, { useState, useEffect } from 'react';
import { Col, Row, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomTabContainer(props) {
    const navigate = useNavigate();
    const [iotKey, setIotKey] = useState(props.value);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [currentTime]);

    return (
        <div>
            <h2>{iotKey} Dashboard</h2>
            <br />
            <div style={IoTcontainerStyle} className="d-flex justify-content-center">
                <Tab.Container defaultActiveKey={props.value}>
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
    );
}

export default CustomTabContainer;

const IoTcontainerStyle = {
    border: '2px solid #000',
    padding: '5px',
    borderRadius: '10px',
    width: '20vmax',
    margin: 'auto',
};

const tabItemStyle = {
    color: 'black',
};

const activeTabItemStyle = {
    backgroundColor: 'black',
    color: 'white',
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
