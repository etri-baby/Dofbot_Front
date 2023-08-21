import React, { useEffect, useState } from 'react';
import AreaChart from '../../layout/AreaChart'; // AreaChart.js 파일 경로를 정확하게 지정
import axios from 'axios';

function CarbonDioxide(intervalKey) {
    const [value, setValue] = useState('');

    useEffect(() => {
        axios.get('/api/smartfarm/sensor/illu').then((response) => {
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
