import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Card, Metric, Text } from '@tremor/react';

ChartJS.register(...registerables);

export default function StatsDashboard({ stats }) {
    // Datos de ejemplo (deberías reemplazarlos con tus props reales)
    const data = {
        aprobados: stats?.aprobados || 75,
        realizados: stats?.realizados || 12,
        promedio: stats?.promedio || 7.8,
        progreso: stats?.progreso || 62
    };

    // Configuración de gráficos
    const doughnutData = {
        labels: ['Aprobados', 'Reprobados'],
        datasets: [{
            data: [data.aprobados, 100 - data.aprobados],
            backgroundColor: ['#4ade80', '#f87171'],
            hoverOffset: 4
        }]
    };

    const barData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Exámenes realizados',
            data: [3, 2, 4, 1, 5, 2],
            backgroundColor: '#60a5fa'
        }]
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Tarjeta 1: Porcentaje de aprobación */}
            <Card className="flex flex-col items-center p-4">
                <Text>Porcentaje de Aprobación</Text>
                <Metric>{data.aprobados}%</Metric>
                <div className="w-32 h-32 mt-4">
                    <Doughnut 
                        data={doughnutData}
                        options={{ cutout: '70%', plugins: { legend: { display: false } } }}
                    />
                </div>
            </Card>

            {/* Tarjeta 2: Exámenes realizados */}
            <Card className="p-4">
                <Text>Total de Exámenes</Text>
                <Metric>{data.realizados}</Metric>
                <div className="h-48 mt-4">
                    <Bar 
                        data={barData}
                        options={{ 
                            responsive: true,
                            scales: { y: { beginAtZero: true } }
                        }}
                    />
                </div>
            </Card>

            {/* Tarjeta 3: Promedio de calificaciones */}
            <Card className="p-4 flex flex-col items-center justify-center">
                <Text>Promedio General</Text>
                <Metric>{data.promedio}/10</Metric>
                <div className="w-full mt-6 bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${data.promedio * 10}%` }}
                    ></div>
                </div>
            </Card>

            {/* Tarjeta 4: Progreso general */}
            <Card className="p-4">
                <Text>Progreso del Curso</Text>
                <Metric>{data.progreso}%</Metric>
                <div className="h-48 mt-4">
                    <Line 
                        data={{
                            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
                            datasets: [{
                                label: 'Progreso',
                                data: [20, 35, 45, 55, data.progreso],
                                borderColor: '#8b5cf6',
                                tension: 0.3,
                                fill: true
                            }]
                        }}
                    />
                </div>
            </Card>
        </div>
    );
}