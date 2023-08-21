import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart';
import axios from 'axios';

function Illuminance({ illuminanceData }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/smartfarm/sensor/illu').then((response) => {
            setValue(response.data);
        });
    }, [value]);

    const series = [
        {
            name: 'Illuminance',
            data: illuminanceData.map((item) => [new Date(item.timestamp).getTime(), item.illuminance]),
        },
    ];

    return (
        <div>
            <AreaChart series={series} titleName={'Illuminance'} color="#339933" subtitleName={value + 'lx'} />
        </div>
    );
}

export default Illuminance;
