import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const data = {
        labels: ['01 Aug', '02 Aug', '03 Aug', '04 Aug', '05 Aug', '06 Aug'], // X-axis labels
        datasets: [
            {
                label: 'Sales ($)',
                data: [65, 59, 80, 81, 56, 55], // Data points
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4, // Line smoothness
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Position of the legend
            },
            title: {
                display: true,
                text: 'Monthly Attendance Comparision Chart', // Title of the chart
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Y-axis starts at 0
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
