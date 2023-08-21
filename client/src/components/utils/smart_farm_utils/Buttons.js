import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

function Buttons() {
    const [ledStatus, setLedStatus] = useState('');
    const [fanStatus, setFanStatus] = useState('');
    const [pumpStatus, setPumpStatus] = useState('');
    const [windowStatus, setWindowStatus] = useState('');

    useEffect(() => {
        axios.get('/api/smartfarm/actuator').then((response) => {
            const data = response.data;
            setLedStatus(data.led === 0 ? 'OFF' : 'ON');
            setFanStatus(data.fan === 0 ? 'OFF' : 'ON');
            setPumpStatus(data.pump === 0 ? 'OFF' : 'ON');
            setWindowStatus(data.window === 0 ? 'OFF' : 'ON');
        });
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <CustomTabContainer
                className="self-center"
                sensor={'led'}
                status={ledStatus}
                setStatus={setLedStatus}
                icon={<LightbulbOutlinedIcon />}
            />
            <CustomTabContainer sensor={'fan'} status={fanStatus} setStatus={setFanStatus} icon={<AirOutlinedIcon />} />
            <CustomTabContainer
                sensor={'pump'}
                status={pumpStatus}
                setStatus={setPumpStatus}
                icon={<WaterDropOutlinedIcon />}
            />
            <CustomTabContainer
                sensor={'window'}
                status={windowStatus}
                setStatus={setWindowStatus}
                icon={<WindowOutlinedIcon />}
            />
        </div>
    );
}

export default Buttons;

function getDataIntervalContainerStyle() {
    const isMobile = window.innerWidth <= 768;
    return {
        border: '1px solid #000',
        borderRadius: '2vmax',
        width: isMobile ? '7.5vmax' : '3.5vmax',
        margin: 'auto',
    };
}

const tabItemStyle = {
    color: 'black',
};

const activeTabItemStyle = {
    backgroundColor: 'black',
    color: 'white',

    borderRadius: '2vmax',
};

function CustomTabContainer(props) {
    const dataIntervalContainerStyle = getDataIntervalContainerStyle();

    const handleStatusChange = (eventKey) => {
        props.setStatus(eventKey);

        const controlValue = eventKey === 'ON' ? 1 : 0;
        const url = `/api/smartfarm/actuator/control?kitType=farm&sensor=${props.sensor}&control=${controlValue}`;
        axios
            .post(url)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {});
    };

    return (
        <div style={dataIntervalContainerStyle} className="d-flex items-stretch">
            <div>
                <Tab.Container>
                    <Row>
                        <Col>
                            <Nav variant="pills" className="d-flex flex-column" onSelect={handleStatusChange}>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="ON"
                                        style={props.status === 'ON' ? activeTabItemStyle : tabItemStyle}
                                    >
                                        {props.icon} ON
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="OFF"
                                        style={props.status === 'OFF' ? activeTabItemStyle : tabItemStyle}
                                    >
                                        {props.icon} OFF
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    );
}
