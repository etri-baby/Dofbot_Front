import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart'; // AreaChart.js 파일 경로를 정확하게 지정
import axios from 'axios';

function Humidity({ humidityData }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/smartfarm/sensor/humi').then((response) => {
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
