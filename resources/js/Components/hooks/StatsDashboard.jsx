import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import Can from "./Can";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function StatsDashboard({ stats }) {
    const activos = stats?.usuarios?.activos ?? 0;
    const inactivos = stats?.usuarios?.inactivos ?? 0;
    const total = stats?.usuarios?.total ?? 0;
    const examenesPorProfesor = stats?.examenes_por_profesor ?? [];

    // Datos para la gráfica de usuarios
    const data = {
        labels: ["Activos", "Inactivos", "Totales"],
        datasets: [
            {
                label: "Usuarios",
                data: [activos, inactivos, total],
                backgroundColor: ["#34D399", "#F87171", "#3B82F6"],
                borderColor: ["#059669", "#B91C1C", "#2563EB"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
        },
    };

    // Leyenda personalizada
    const customLegend = (
        <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Activos
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Inactivos
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded-sm"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Totales
                </span>
            </div>
        </div>
    );

    const usuariosSection = (
        <div className="border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Estadísticas de Usuarios
            </h2>

            {customLegend}

            <div>
                <Bar data={data} options={options} />
            </div>

            <div className="mt-6 flex justify-around text-sm text-gray-700 dark:text-gray-300">
                <p>Activos: {activos}</p>
                <p>Inactivos: {inactivos}</p>
                <p>Total: {total}</p>
            </div>
        </div>
    );

    const chartData = {
        labels: examenesPorProfesor.map((p) => p.profesor),
        datasets: [
            {
                label: "Exámenes subidos",
                data: examenesPorProfesor.map((p) => p.total),
                backgroundColor: [
                    "#F87171",
                    "#60A5FA",
                    "#34D399",
                    "#FBBF24",
                    "#A78BFA",
                ],
                borderWidth: 1,
            },
        ],
    };

    const profesoresSection = (
        <div className="border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Profesores con más exámenes subidos
            </h2>
            <div
                className="mx-auto"
                style={{ width: "300px", height: "300px" }}
            >
                <Doughnut data={chartData} />
            </div>
        </div>
    );

    const examenesPorMes = stats?.examenes_por_mes ?? [];

    const dataExamenesMes = {
        labels: examenesPorMes.map((e) => e.mes),
        datasets: [
            {
                label: "Exámenes subidos por mes",
                data: examenesPorMes.map((e) => e.total),
                backgroundColor: "#60A5FA",
                borderColor: "#2563EB",
                borderWidth: 1,
            },
        ],
    };

    const optionsExamenesMes = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // <- muestra solo enteros
                    precision: 0,
                },
            },
        },
    };

    const examenesMesSection = (
        <div className="border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Exámenes subidos por mes
            </h2>
            <div className="mx-auto" style={{ width: "300px", height: "300px" }}>

            <Bar data={dataExamenesMes} options={optionsExamenesMes} />
            </div>
        </div>
    );

    return (
        <>
            <Can permission="permisoadmin">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {usuariosSection}
                    {profesoresSection}
                    {examenesMesSection}
                </div>
            </Can>

            <Can permission="permisoprofesor">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {usuariosSection}
                </div>
            </Can>

            <Can permission="sinpermiso">
                <div className="mt-10">
                    {usuariosSection}
                    {usuariosSection}
                    {usuariosSection}
                </div>
            </Can>
        </>
    );
}
