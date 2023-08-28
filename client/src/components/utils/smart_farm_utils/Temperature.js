import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart';
import axios from 'axios';

function Temperature({ temperatureData }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + '/api/smartfarm/sensor/temp').then((response) => {
            setValue(response.data);
        });
    }, [value]);

    const series = [
        {
            name: 'Temperature',
            data: temperatureData.map((item) => [new Date(item.timestamp).getTime(), item.temperature]),
        },
    ];

    return (
        <div>
            <AreaChart series={series} titleName={'Temperature'} color="#FFDE5C" subtitleName={value + '°C'} />
        </div>
    );
}

export default Temperature;
