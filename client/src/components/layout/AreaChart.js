import React from 'react';
import ReactApexChart from 'react-apexcharts';

function AreaChart({ series, titleName, color, subtitleName }) {
    const options = {
        series: [series],
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            text: titleName,
            align: 'left',
            style: {
                fontSize: '24px',
            },
        },
        subtitle: {
            text: subtitleName,
            align: 'right',
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
            },
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true,
        },
        legend: {
            horizontalAlign: 'left',
        },

        colors: [color],
    };

    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={210} />
        </div>
    );
}

export default AreaChart;
