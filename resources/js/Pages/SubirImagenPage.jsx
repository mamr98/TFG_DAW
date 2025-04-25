import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import SubirImagen from "@/Components/hooks/SubirImagen";
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingState from "./Profesor/LoadingState";
import EmptyState from "./Profesor/EmptyState";

export default function SubirImagenPage() {
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);
    const [isReloading, setIsReloading] = useState(false);

    const fetchExamenes = () => {
        setIsReloading(true);
        fetch("examenesAlumno")
            .then((response) => response.json())
            .then((data) => {
                setExamenes(data);
            })
            .catch((error) => {
                console.error("Error al obtener los exámenes:", error);
                toast.error("Error al cargar los exámenes");
            })
            .finally(() => {
                setLoading(false);
                setIsReloading(false);
            });
    };

    useEffect(() => {
        fetchExamenes();
    }, []);

    const handleUploadSuccess = (examenIdSubido) => {
        // Filtramos la lista de exámenes para eliminar el que se acaba de subir
        setExamenes((prevExamenes) =>
            prevExamenes.filter((examen) => examen.id !== examenIdSubido)
        );
        // Opcionalmente, podrías cerrar el formulario de subida para ese examen
        setMostrarSubirImagen((prevMostrar) =>
            prevMostrar === examenIdSubido ? false : prevMostrar
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Subir Examen
                </h2>
            }
        >
            <Head title="Subir Examen" />
            <ToastContainer />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Exámenes Disponibles
                    </h1>
                    <button
                        onClick={fetchExamenes}
                        disabled={isReloading}
                        className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-900 dark:text-emerald-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                                isReloading ? "animate-spin" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        {isReloading ? "Recargando..." : "Recargar"}
                    </button>
                </div>

                {loading ? (
                    <LoadingState />
                ) : examenes.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <div className="space-y-4">
                                {examenes.map((examen) => (
                                    <div
                                        key={examen.id}
                                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {examen.nombre_examen}
                                                </h3>
                                                {examen.asignatura ? (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        Asignatura:{" "}
                                                        {
                                                            examen.asignatura
                                                                .nombre
                                                        }
                                                        {examen.asignatura
                                                            .codigo &&
                                                            ` (${examen.asignatura.codigo})`}
                                                    </p>
                                                ) : examen.asignatura_id ? (
                                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                                        Asignatura ID:{" "}
                                                        {asignatura.nombre}{" "}
                                                        (nombre no disponible)
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                                        Sin asignatura asignada
                                                    </p>
                                                )}
                                            </div>
                                            <PrimaryButton
                                                onClick={() =>
                                                    setMostrarSubirImagen(
                                                        mostrarSubirImagen ===
                                                            examen.id
                                                            ? false
                                                            : examen.id
                                                    )
                                                }
                                                className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-5 w-5 transform transition-transform duration-700 ${
                                                        mostrarSubirImagen === examen.id ? "rotate-180" : "rotate-0"
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="hidden sm:inline">
                                                    {mostrarSubirImagen ===
                                                    examen.id
                                                        ? "Cancelar"
                                                        : "Subir Examen"}
                                                </span>
                                            </PrimaryButton>
                                        </div>

                                        <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out 
                                            ${mostrarSubirImagen === examen.id ? "max-h-[1000px]" : "max-h-0"}`}>
                                            <div className={`transition-opacity duration-300 ease-in-out 
                                                ${mostrarSubirImagen === examen.id ? "opacity-100 delay-100" : "opacity-0"}`}>
                                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    <SubirImagen
                                                        examenId={examen.id}
                                                        onUploadSuccess={handleUploadSuccess}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        message="No hay exámenes disponibles para subir"
                        actionText="Recargar"
                        onAction={fetchExamenes}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
