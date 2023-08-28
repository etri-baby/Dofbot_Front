import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart';
import axios from 'axios';

function Humidity({ humidityData }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + '/api/smartfarm/sensor/humi').then((response) => {
            setValue(response.data);
        });
    }, [value]);

    const series = [
        {
            name: 'Humidity',
            data: humidityData.map((item) => [new Date(item.timestamp).getTime(), item.humidity]),
        },
    ];

    return (
        <div>
            <AreaChart series={series} titleName={'Humidity'} color="#753498" subtitleName={value + '%'} />
        </div>
    );
}

export default Humidity;
