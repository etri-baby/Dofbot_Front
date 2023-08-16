import React, { useState, useEffect } from 'react';
import './Gamepad.css'; // 스타일링을 위한 CSS 파일
import Button from 'react-bootstrap/Button';
import { Col, Row, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MqttCameraTry from '../utils/Camera';

export default function SmartArmDashboard() {
    const [iotKey, setIotKey] = useState('SmartArm');
    const [currentTime, setCurrentTime] = useState(new Date());
    const initialAxes = {
        0: -0.0039,
        1: -0.0039,
        2: 0.0039,
        5: 0.0039,
    };

    const initialButtons = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
    };

    const [axes, setAxes] = useState(initialAxes);
    const [buttons, setButtons] = useState(initialButtons);
    const [isSending, setIsSending] = useState(false);

    const navigate = useNavigate();

    const handleAxisPress = (axis, value) => {
        setAxes((prevAxes) => ({
            ...prevAxes,
            [axis]: parseFloat(value),
        }));
        setIsSending(true);
    };

    const handleAxisRelease = (axis, value) => {
        setAxes((prevAxes) => ({
            ...prevAxes,
            [axis]: parseFloat(value),
        }));
        setIsSending(false);
        sendDefaultGamepadInput();
    };

    const handleButtonPress = (button) => {
        setButtons((prevButtons) => ({
            ...prevButtons,
            [button]: true,
        }));
        setIsSending(true);
    };

    const handleButtonRelease = (button) => {
        setButtons((prevButtons) => ({
            ...prevButtons,
            [button]: false,
        }));
        setIsSending(false);
        sendDefaultGamepadInput();
    };

    const sendGamepadInput = async () => {
        try {
            const formattedAxes = Object.entries(axes)
                .map(([key, value]) => `axis_${key}=${value}`)
                .join('&');

            const formattedButtons = Object.entries(buttons)
                .map(([key, value]) => `button_${key}=${value}`)
                .join('&');

            const queryString = `${formattedAxes}&${formattedButtons}`;

            const response = await axios.post(`/api/mqtt/send_pad_data?${queryString}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending gamepad input:', error);
        }
    };

    const sendDefaultGamepadInput = async () => {
        try {
            const formattedAxes = Object.entries(initialAxes)
                .map(([key, value]) => `axis_${key}=${value}`)
                .join('&');

            const formattedButtons = Object.entries(initialButtons)
                .map(([key, value]) => `button_${key}=${value}`)
                .join('&');

            const queryString = `${formattedAxes}&${formattedButtons}`;

            const response = await axios.post(`/api/mqtt/send_pad_data?${queryString}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending gamepad input:', error);
        }
    };

    useEffect(() => {
        if (isSending) {
            sendGamepadInput();
        }
    }, [axes, buttons, isSending]);

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
                <div>{/* Grid 1 */}</div>
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
            <div className="grid grid-rows-2 grid-flow-col gap-4">
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
                </div>
                <div className="row-span-1 arm-custom-box justify-center">
                    <MqttCameraTry />
                </div>
                <div className="inner-fit-custom-box">
                    <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-4 mx-8 my-8">
                        <div className="grid grid-cols-3 direction-buttons">
                            <div>{/* Grid 1 */}</div>
                            <div>
                                <button
                                    className="button-up"
                                    onMouseDown={() => handleAxisPress('1', -1)}
                                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                                >
                                    ↑
                                </button>
                            </div>
                            <div>{/* Grid 3 */}</div>
                            <div>
                                <button
                                    className="button-left"
                                    onMouseDown={() => handleAxisPress('0', -1)}
                                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                                >
                                    ←
                                </button>
                            </div>
                            <div>{/* Grid 5 */}</div>
                            <div>
                                <button
                                    className="button-right"
                                    onMouseDown={() => handleAxisPress('0', 1)}
                                    onMouseUp={() => handleAxisRelease('0', -0.0039)}
                                >
                                    →
                                </button>
                            </div>
                            <div>{/* Grid 7 */}</div>
                            <div>
                                <button
                                    className="button-down"
                                    onMouseDown={() => handleAxisPress('1', 1)}
                                    onMouseUp={() => handleAxisRelease('1', -0.0039)}
                                >
                                    ↓
                                </button>
                            </div>
                            <div>{/* Grid 9 */}</div>
                        </div>

                        <div className="row row-span-2 middle-buttons">
                            <button
                                className="button-select"
                                onMouseDown={() => handleButtonPress('8')}
                                onMouseUp={() => handleButtonRelease('8')}
                            >
                                SELECT
                            </button>
                        </div>
                        <div className="row row-span-2 middle-buttons">
                            <button
                                className="button-select"
                                onMouseDown={() => handleButtonPress('9')}
                                onMouseUp={() => handleButtonRelease('9')}
                            >
                                ?
                            </button>
                        </div>
                        <div className="row row-span-2 number-buttons">
                            <button
                                className="button-1"
                                onMouseDown={() => handleButtonPress('0')}
                                onMouseUp={() => handleButtonRelease('0')}
                            >
                                1
                            </button>
                            <button
                                className="button-2"
                                onMouseDown={() => handleButtonPress('1')}
                                onMouseUp={() => handleButtonRelease('1')}
                            >
                                2
                            </button>
                            <button
                                className="button-3"
                                onMouseDown={() => handleButtonPress('2')}
                                onMouseUp={() => handleButtonRelease('2')}
                            >
                                3
                            </button>
                            <button
                                className="button-4"
                                onMouseDown={() => handleButtonPress('3')}
                                onMouseUp={() => handleButtonRelease('3')}
                            >
                                4
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="arm-custom-box grid grid-cols-2 grid-rows-5 gap-4">
                <div className="button-up">↑</div>
                <div className="button-down">↓</div>
                <div className="button-left">←</div>
                <div className="button-right">→</div>
                <div className="button-select">RESET</div>
                <div className="button-select">?</div>
                <div className="button-1">1</div>
                <div className="button-2">2</div>
                <div className="button-3">3</div>
                <div className="button-4">4</div>
            </div>
        </div>
    );
}
