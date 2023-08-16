import React from 'react';
import ReactApexChart from 'react-apexcharts';

function AreaChart({ series, titleName }) {
    const options = {
        series: [series],
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false,
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
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true,
        },
        legend: {
            horizontalAlign: 'left',
        },
    };

    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={210} />
        </div>
    );
}

export default AreaChart;
