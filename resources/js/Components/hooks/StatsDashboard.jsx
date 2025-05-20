import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Link } from "@inertiajs/react";
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
    const [loadingDots, setLoadingDots] = useState('');
    const [dotCounter, setDotCounter] = useState(0);

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
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
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
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900 h-[300px] flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
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
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900 h-[300px] flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
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

    useEffect(() => {
        if (clases.length === 0) {
          const intervalId = setInterval(() => {
            setDotCounter((prevCounter) => (prevCounter + 1) % 6);
            setLoadingDots('Cargando clases asignadas' + '.'.repeat((dotCounter % 3) + 1));
          }, 500); // Ajusta la velocidad del efecto cambiando este valor
    
          return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
        } else {
          setLoadingDots(''); // Resetear los puntos si ya hay clases
        }
      }, [clases.length, dotCounter]);

    // Nueva sección para los cursos del profesor

    const clasesSection = (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Tus Cursos Asignados
            </h2>
            <div>
                {clases.length > 0 ? (
                    <ul className="space-y-2">
                        {clases.map((clase) => (
                            <li key={clase.id}>
                                <Link
                                    href={route("alumnos.clase", clase.id)}
                                    className="block bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-md font-bold text-white dark:text-gray-800 hover:brightness-110 transition duration-200"
                                >
                                    {clase.nombre}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{loadingDots}</p>
                )}
            </div>
        </div>
    );
 

   /*  const clasesSection = (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Cursos Asignados
            </h2>
            <div>
                {clases.length > 0 ? (
                    <ul className="space-y-2">
                        {clases.map((clase) => (
                            <li
                                key={clase.id}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-md text-white dark:text-gray-800 font-bold"
                            >
                                {clase.nombre}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{loadingDots}</p>
                )}
            </div>
        </div>
    ); */ 

    const [totalExamenes, setTotalExamenes] = useState(0); // Nuevo estado para el total de exámenes

    useEffect(() => {
        axios
            .get("examenes/total")
            .then((response) => {
                setTotalExamenes(response.data.total);
            })
            .catch((error) => {
                console.error("Error al obtener el total de exámenes:", error);
            });
    }, []);

    // Seccion donde se muestra el nº de exámenes totales
    const claseSection = (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Exámenes Creados en la App
            </h2>
            {/* Mostrar el total de exámenes */}
            <div
                className="mt-4 p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex flex-col items-center justify-center min-h-[100px]" // Añadimos min-h
            >
                <p className="font-bold text-center text-white dark:text-gray-800">Total de Exámenes:</p>
                <p className="text-center">
                    <span className="font-bold text-white dark:text-gray-800">
                        {totalExamenes}
                    </span>
                </p>
            </div>
        </div>
    );

    // Seccion donde se muestra el nº de exámenes totales por profesor
    const [totalExamenesProfesor, setTotalExamenesProfesor] = useState(0);

    useEffect(() => {
        const fetchTotalExamenesProfesor = async () => {
            try {
                const response = await fetch("examenes/profesor/total");
                const data = await response.json();
                setTotalExamenesProfesor(data.total);
            } catch (error) {
                console.error(
                    "Error al obtener el total de exámenes por profesor:",
                    error
                );
                // Manejar el error según sea necesario
            }
        };

        fetchTotalExamenesProfesor();
    }, []);

    const claseSectionProfesor = (totalExamenesProfesor) => (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Exámenes creados por tí
            </h2>
            {/* Mostrar el total de exámenes por profesor */}
            <div
                className="mt-4 p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex flex-col items-center justify-center min-h-[100px]" // Añadimos min-h
            >
                <p className="font-bold text-white dark:text-gray-800 text-center">Total de Exámenes:</p>
                <p className="text-center">
                    <span className="font-bold text-white dark:text-gray-800">
                        {totalExamenesProfesor}
                    </span>
                </p>
            </div>
        </div>
    );

    // Sección donde se muestra el nº de exámenes totales por alumno

    const [totalExamenesAlumno, setTotalExamenesAlumno] = useState(0);
    useEffect(() => {
        const fetchTotalExamenesAlumno = async () => {
            try {
                const response = await fetch('examenes/alumno/total');
                const data = await response.json();
                setTotalExamenesAlumno(data.total);
            } catch (error) {
                console.error('Error al obtener el total de exámenes por alumno:', error);
                // Manejar el error según sea necesario
            }
        };

        fetchTotalExamenesAlumno();
    }, []);

    const claseSectionAlumno = (totalExamenesAlumno) => (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Exámenes Entregados
            </h2>
            {/* Mostrar el total de exámenes por alumno */}
            <div
                className="mt-4 p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md border border-green-200 dark:border-green-700 flex flex-col items-center justify-center min-h-[100px]"
            >
                <p className="font-bold text-center text-white dark:text-gray-800">Total de Exámenes Entregados:</p>
                <p className="text-center">
                    <span className="font-bold text-white dark:text-gray-800">
                        {totalExamenesAlumno}
                    </span>
                </p>
            </div>
        </div>
    );

    // Sección para mostrar la media del alumno de todos su examenes
    const [mediaExamenesAlumno, setMediaExamenesAlumno] = useState(0);

    useEffect(() => {
        const fetchMediaExamenesAlumno = async () => {
            try {
                const response = await fetch('examenes/alumno/media');
                const data = await response.json();
                setMediaExamenesAlumno(data.media);
            } catch (error) {
                console.error('Error al obtener la media de exámenes del alumno:', error);
                // Manejar el error según sea necesario
            }
        };

        fetchMediaExamenesAlumno();
    }, []);

    const mediaAlumno = (mediaExamenesAlumno) => (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Nota Media
            </h2>
            <div
                className="mt-4 p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md border border-green-200 dark:border-green-700 flex flex-col items-center justify-center min-h-[100px]"
            >
                <p className="font-bold text-center text-white dark:text-gray-800">Nota Media de tus Exámenes:</p>
                <p className="text-center">
                    <span className="font-bold text-white dark:text-gray-800">
                        {parseFloat(mediaExamenesAlumno).toFixed(2)}
                    </span>
                </p>
            </div>
        </div>
    );

    // Sección para mostrar el curso asignado al alumno

    const [nombresClasesAlumno, setNombresClasesAlumno] = useState([]);

    useEffect(() => {
        const fetchClasesAlumno = async () => {
            try {
                const response = await fetch('clase/alumno');
                const data = await response.json();
                setNombresClasesAlumno(data); // data ahora es un array de strings (nombres)
            } catch (error) {
                console.error('Error al obtener las clases del alumno:', error);
                setNombresClasesAlumno([]);
            }
        };

        fetchClasesAlumno();
    }, []);

    const clasAlumno = (nombresClasesAlumno) => (
        <div className="relative border border-green-300 rounded-md p-6 text-center bg-white dark:bg-gray-900">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-t-md" />
            <h2 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 mt-2">
                Tus Cursos Asignados
            </h2>
            <div>
                {nombresClasesAlumno.length > 0 ? (
                    <ul className="space-y-2 text-white dark:text-gray-800">
                        {nombresClasesAlumno.map((nombreClase, index) => (
                            <li
                                key={index}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-md font-bold"
                            >
                                {nombreClase}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{loadingDots}</p>
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
                    {clasesSection} {/* Mostrar las clases del profesor */}
                    {claseSection}
                    {claseSectionProfesor(totalExamenesProfesor)}
                </div>
            </Can>

            <Can permission="sinpermiso">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {claseSectionAlumno(totalExamenesAlumno)} {/* El nuevo componente del alumno */}
                    {mediaAlumno(mediaExamenesAlumno)} {/* El nuevo componente del alumno */}
                    {clasAlumno(nombresClasesAlumno)} {/* El nuevo componente del alumno */}
                </div>
            </Can>
        </>
    );
}
