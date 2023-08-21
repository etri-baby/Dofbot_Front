import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import './Gamepad.css';
import Camera from '../utils/Camera';
import ReadServo from '../utils/smart_arm_utils/ReadServo';
import ControlServo from '../utils/smart_arm_utils/ControlServo';
import CustomTabContainer from '../utils/CustomTabContainer';
import { ControlPad } from '../utils/smart_arm_utils/ControlPad';

export default function SmartArmDashboard() {
    const [isControlPadVisible, setControlPadVisible] = useState(false);

    const handleStartClick = () => {
        setControlPadVisible(true);
    };

    const handleStopClick = () => {
        setControlPadVisible(false);
    };

    return (
        <div className="custom-border">
            <div className="gg grid grid-rows-2 grid-cols-3 grid-flow-col gap-x-4 gap-y-4">
                <div>
                    <CustomTabContainer value={'SmartArm'} />
                </div>
                <div>{/* Grid 2 */}</div>
                <div className="custom-box row-span-2">
                    <div className="image-container">
                        <img
                            className="image"
                            alt={'dofbot_descript'}
                            src={process.env.PUBLIC_URL + 'images/dofbot_descript.png'}
                        />
                    </div>
                </div>
                <div className="custom-box">
                    <p className="title">Servo Angle</p>
                    <ReadServo />
                </div>
                <div className="custom-box">
                    <p className="title">Control Servo</p>
                    <ControlServo />
                </div>
            </div>
            <br />
            <div className="gg grid grid-rows-1 grid-cols-3 grid-flow-row gap-x-4 gap-y-4 ">
                <div className="custom-box">
                    <Camera />
                </div>
                <div className="custom-box col-span-2">
                    <p className="title">GamePad Control</p>
                    <div>
                        <Button className="custom-button" onClick={handleStartClick}>
                            START
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className="custom-button" onClick={handleStopClick}>
                            STOP
                        </Button>
                    </div>
                    {isControlPadVisible && <ControlPad />}
                </div>
            </div>
        </div>
    );
}
