"use client";
import Swal from "sweetalert2";

export default function ExamenActionsMenu({
    examenId,
    ficheroProfesor,
    openMenuId,
    toggleMenu,
    onEditClick,
    onDeleteClick,
    examen,
}) {
    const handleEdit = (e) => {
        e.stopPropagation();

        Swal.fire({
            title: "¿Editar este examen?",
            text: "Se abrirá el formulario para editar el examen",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed && typeof onEditClick === "function") {
                onEditClick(examen);
            }
        });
    };

    const handleDelete = (e) => {
        e.stopPropagation();

        if (typeof onDeleteClick === "function") {
            onDeleteClick(examenId);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={(e) => toggleMenu(examenId, e)}
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

            {openMenuId === examenId && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    {ficheroProfesor && (
                        <a
                            href={`${ficheroProfesor}`}
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
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            Ver PDF
                        </a>
                    )}
                    <button
                        onClick={handleEdit}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Editar examen
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button
                        onClick={handleDelete}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Eliminar examen
                    </button>
                </div>
            )}
        </div>
    );
}
