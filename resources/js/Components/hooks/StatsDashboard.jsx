import React, { useEffect, useState } from "react";
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
import axios from "axios"; // Importa axios para realizar solicitudes

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
    const [clases, setClases] = useState([]);

    useEffect(() => {
        axios
            .get("clases-profesor")
            .then((response) => {
                setClases(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener las clases:", error);
            });
    }, []);

    //Apartado para el admin
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

    const usuariosSection = (
        <div className="relative border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Estadísticas de Usuarios
            </h2>
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
        <div className="relative border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900 h-[300px] flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Profesores con más exámenes subidos
            </h2>
            <div className="flex-1 w-full relative">
                <div className="absolute inset-0">
                    <Doughnut
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
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
        <div className="relative border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900 h-[300px] flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Exámenes subidos por mes
            </h2>
            <div className="flex-1 w-full relative">
                <div className="absolute inset-0">
                    <Bar
                        data={dataExamenesMes}
                        options={{
                            ...optionsExamenesMes,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
        </div>
    );

    // Nueva sección para las clases del profesor
    const clasesSection = (
        <div className="relative border border-blue-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Clases Asignadas
            </h2>
            <div>
                {clases.length > 0 ? (
                    <ul className="space-y-2">
                        {clases.map((clase) => (
                            <li
                                key={clase.id}
                                className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
                            >
                                {clase.nombre}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes clases asignadas.</p>
                )}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {usuariosSection}
                    {clasesSection} {/* Mostrar las clases del profesor */}
                </div>
            </Can>

            <Can permission="sinpermiso">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {usuariosSection}
                    {usuariosSection}
                    {usuariosSection}
                </div>
            </Can>
        </>
    );
}
