import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const Grafico = ({ chartData }) => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const data = {
        labels: chartData.map(item => item.name),
        datasets: [
            {
                data: chartData.map(item => item.value),
                backgroundColor: chartData.map((item, index) => item.color || defaultColors[index % defaultColors.length]),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md" style={{ height: '400px' }}>
            <h2 className="text-lg font-semibold mb-4">Distribución de Usuarios por Rol</h2>
            <Pie data={data} options={options} />
        </div>
    );
};
export default Grafico;