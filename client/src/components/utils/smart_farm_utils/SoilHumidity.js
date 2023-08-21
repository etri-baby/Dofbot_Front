import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart';
import axios from 'axios';

function SoilHumidity({ soilHumidityData }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/smartfarm/sensor/soil').then((response) => {
            setValue(response.data);
        });
    }, [value]);

    const series = [
        {
            name: 'SoilHumidity',
            data: soilHumidityData.map((item) => [new Date(item.timestamp).getTime(), item.soilHumidity]),
        },
    ];

    return (
        <div>
            <AreaChart series={series} titleName={'Soil Humidity'} color="#CF3B32" subtitleName={value + '%'} />
        </div>
    );
}

export default SoilHumidity;
