"use client";

import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalFormulario from "@/Components/hooks/ModalFormulario";

export default function PanelProfesor() {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenuId, setOpenMenuId] = useState(null);

    // Añadir estos estados para la paginación justo después de los estados existentes
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isReloading, setIsReloading] = useState(false);

    // Mostrar notificaciones flash
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Reemplazar la función de obtener exámenes con esta versión que incluye el estado de recarga
    const fetchExamenes = () => {
        setIsReloading(true);
        fetch("examenesProfesor")
            .then((response) => response.json())
            .then((data) => {
                // Ordenar por fecha de creación (más recientes primero)
                const sortedData = data.sort(
                    (a, b) =>
                        new Date(b.examen.created_at) -
                        new Date(a.examen.created_at)
                );
                setExamenes(sortedData);
                setLoading(false);
                setIsReloading(false);
                // Resetear a la primera página cuando se recargan los datos
                setCurrentPage(1);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
                setIsReloading(false);
                toast.error("Error al cargar los exámenes");
            });
    };

    // Reemplazar el useEffect existente que hace el fetch con este
    useEffect(() => {
        fetchExamenes();
    }, []);

    // Confirmación para abrir formulario
    const handleNuevoExamen = () => {
        Swal.fire({
            title: "¿Subir nuevo examen?",
            text: "Se abrirá el formulario para crear un nuevo examen",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                setShowForm(true);
            }
        });
    };

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const closeMenu = () => {
        setOpenMenuId(null);
    };

    // Añadir esta función para calcular los exámenes paginados después de la función closeMenu
    const paginatedExamenes = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return examenes.slice(startIndex, endIndex);
    };

    // Añadir esta función para calcular el total de páginas
    const totalPages = Math.ceil(examenes.length / itemsPerPage);

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = () => closeMenu();
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Panel de Exámenes
                </h2>
            }
        >
            <Head title="Panel de Exámenes" />
            <ToastContainer />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm ? (
                    <ModalFormulario onClose={() => setShowForm(false)} />
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Gestión de Exámenes
                            </h1>
                            <PrimaryButton
                                onClick={handleNuevoExamen}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Crear Examen
                            </PrimaryButton>
                        </div>

                        {/* Listado de exámenes */}
                        <div className="mt-6">
                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                                </div>
                            ) : examenes.length > 0 ? (
                                <>
                                    {/* Reemplazar el div que contiene el título "Tus exámenes" y el contador con este que incluye el botón de recarga */}
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-emerald-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            Tus exámenes
                                            <span className="ml-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-emerald-900 dark:text-emerald-300">
                                                {examenes.length}
                                            </span>
                                        </h2>
                                        <button
                                            onClick={fetchExamenes}
                                            disabled={isReloading}
                                            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 ${
                                                    isReloading
                                                        ? "animate-spin"
                                                        : ""
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
                                            {isReloading
                                                ? "Recargando..."
                                                : "Recargar"}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Reemplazar la línea que mapea los exámenes con esta versión que usa la paginación */}
                                        {paginatedExamenes().map((examen) => (
                                            <div
                                                key={examen.examen?.id}
                                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 relative group"
                                            >
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                                {
                                                                    examen
                                                                        .examen
                                                                        .nombre_examen
                                                                }
                                                            </h3>
                                                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                                                <p className="flex items-center gap-2">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-emerald-500"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">
                                                                        Asignatura:
                                                                    </span>{" "}
                                                                    <span className="truncate">
                                                                        {examen
                                                                            .asignatura
                                                                            ?.nombre ||
                                                                            "No especificada"}
                                                                    </span>
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-emerald-500"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">
                                                                        Inicio:
                                                                    </span>{" "}
                                                                    {new Date(
                                                                        examen.examen.fecha_inicio
                                                                    ).toLocaleString()}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-emerald-500"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">
                                                                        Fin:
                                                                    </span>{" "}
                                                                    {new Date(
                                                                        examen.examen.fecha_fin
                                                                    ).toLocaleString()}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4 text-emerald-500"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">
                                                                        Subido:
                                                                    </span>{" "}
                                                                    {new Date(
                                                                        examen.examen.created_at
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Menú de acciones */}
                                                        <div className="relative">
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    toggleMenu(
                                                                        examen
                                                                            .examen
                                                                            .id
                                                                    );
                                                                }}
                                                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                </svg>
                                                            </button>

                                                            {openMenuId ===
                                                                examen.examen
                                                                    .id && (
                                                                <div
                                                                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                >
                                                                    {examen
                                                                        .examen
                                                                        .fichero_profesor && (
                                                                        <a
                                                                            href={`/storage/${examen.examen.fichero_profesor}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-4 w-4 mr-2 text-emerald-500"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={
                                                                                        2
                                                                                    }
                                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                                />
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={
                                                                                        2
                                                                                    }
                                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                                />
                                                                            </svg>
                                                                            Ver
                                                                            PDF
                                                                        </a>
                                                                    )}
                                                                    <a
                                                                        href="#"
                                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-4 w-4 mr-2 text-emerald-500"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                            />
                                                                        </svg>
                                                                        Editar
                                                                        examen
                                                                    </a>
                                                                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                                                    <a
                                                                        href="#"
                                                                        className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-4 w-4 mr-2"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                        Eliminar
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {examen.examen
                                                        .json_examen && (
                                                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3.5 w-3.5 mr-1"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                                Configuración
                                                                personalizada
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Añadir este componente de paginación justo después del cierre del div que contiene el grid de exámenes (después de </div> que cierra el grid) */}
                                    {examenes.length > 0 && (
                                        <div className="mt-8 flex justify-center">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setCurrentPage(1)
                                                    }
                                                    disabled={currentPage === 1}
                                                    className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage - 1
                                                        )
                                                    }
                                                    disabled={currentPage === 1}
                                                    className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>

                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => i + 1
                                                ).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                        className={`px-3.5 py-2 rounded-md border ${
                                                            currentPage === page
                                                                ? "bg-emerald-500 text-white border-emerald-500"
                                                                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                        } transition-colors`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage + 1
                                                        )
                                                    }
                                                    disabled={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                    className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            totalPages
                                                        )
                                                    }
                                                    disabled={
                                                        currentPage ===
                                                        totalPages
                                                    }
                                                    className="p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Añadir este componente de selector de elementos por página justo después del componente de paginación */}
                                    {examenes.length > itemsPerPage && (
                                        <div className="mt-4 flex justify-center">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                                <span>Mostrar</span>
                                                <select
                                                    value={itemsPerPage}
                                                    onChange={(e) => {
                                                        setItemsPerPage(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        );
                                                        setCurrentPage(1); // Resetear a la primera página cuando cambia el número de elementos
                                                    }}
                                                    className="px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                                >
                                                    <option value={6}>6</option>
                                                    <option value={12}>
                                                        12
                                                    </option>
                                                    <option value={24}>
                                                        24
                                                    </option>
                                                    <option value={48}>
                                                        48
                                                    </option>
                                                </select>
                                                <span>por página</span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-200 dark:border-gray-700">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                                            No hay exámenes registrados
                                        </p>
                                        <button
                                            onClick={handleNuevoExamen}
                                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Crear tu primer examen
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
