import React, { useState } from 'react';
import './smartfarm_camera.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Esp32Cam() {
    const [streamUrl, setStreamUrl] = useState('');

    const handleConnectClick = () => {
        const inputUrl = document.getElementById('streamUrlInput').value;
        setStreamUrl(inputUrl);
        console.log(inputUrl);
    };

    return (
        <div className="main-container">
            <div className="video-block">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p className="title" style={{ display: 'inline-block', marginRight: '10px' }}>
                        Camera
                    </p>
                    <InputGroup
                        className="mb-3"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '70%',
                            height: '8%',
                            paddingLeft: '2vmax',
                        }}
                    >
                        <Form.Control
                            id="streamUrlInput" // Adding an ID for easier access
                            placeholder="Input Stream URL"
                            aria-label="Input Stream URL"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={handleConnectClick}>
                            connect
                        </Button>
                    </InputGroup>
                </div>
                {streamUrl && ( // Only render the image if a valid URL is provided
                    <img
                        alt="Video stream"
                        src={streamUrl} // Use the state's stream URL as the source
                        style={{ objectFit: 'contain', backgroundColor: '#353535', margin: 'auto' }}
                    />
                )}
            </div>
        </div>
    );
}

export default Esp32Cam;
