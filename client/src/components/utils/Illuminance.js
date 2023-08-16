import React from 'react';
import AreaChart from '../layout/AreaChart'; // AreaChart.js 파일 경로를 정확하게 지정

function Illuminance() {
    const series = [
        {
            name: 'Illuminance',
            data: [
                [1486684800000, 34],
                [1486771200000, 43],
                [1486857600000, 31],
                [1486944000000, 43],
                [1487030400000, 33],
                [1487116800000, 52],
            ],
        },
    ];

    return (
        <div>
            <AreaChart series={series} titleName={'Illuminance'} />
        </div>
    );
}

export default Illuminance;
