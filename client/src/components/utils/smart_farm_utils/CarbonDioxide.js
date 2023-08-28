import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart';
import axios from 'axios';

function CarbonDioxide(intervalKey) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + '/api/smartfarm/sensor/illu').then((response) => {
            setValue(response.data);
        });
    }, [value]);

    const series = [
        {
            name: 'CarbonDioxide',
            data: [[0, 0]],
        },
    ];

    return (
        <div>
            <AreaChart
                series={series}
                titleName={'Carbon Dioxide'}
                subtitleName={'NaN ppm'}
                color="#1974D2"
                intervalKey={intervalKey}
            />
        </div>
    );
}

export default CarbonDioxide;
