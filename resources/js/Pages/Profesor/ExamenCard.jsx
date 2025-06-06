"use client";

import { useState } from "react";
import ExamenActionsMenu from "./ExamenActionsMenu";
import Swal from "sweetalert2";
export default function ExamenCard({
    examen,
    asignatura,
    onEditClick,
    onDeleteClick,
    tieneRelaciones,
}) {
    console.log(`Examen ${examen.id} tiene relaciones:`, tieneRelaciones);
    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };
    const handleVerNotas = () => {
        const examenData = examen.json_examen;
        const respuestasCorrectas = examenData.respuestas_correctas;

        let html = `
            <style>
                .respuestas-container {
                    max-height: 400px;
                    overflow-y: auto;
                    padding: 0 4px;
                    margin-top: 16px;
                }
                .respuestas-table-container {
                    width: 100%;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scroll-behavior: smooth;
                }
                .respuestas-table {
                    width: auto; /* Se ajusta al contenido, permitiendo scroll horizontal */
                    min-width: 100%; /* Asegura que al menos ocupe el ancho del contenedor */
                    border-collapse: separate;
                    border-spacing: 0 8px;
                    font-family: 'Segoe UI', sans-serif;
                }
                .respuestas-table th {
                    color: #4b5563; /* Texto gris oscuro */
                    font-weight: 600; /* Negrita */
                    padding: 12px 20px; /* Más espaciado */
                    text-align: center; /* Centrado del texto del encabezado */
                    font-size: 14px;
                    background-color: #f9fafb; /* Gris claro de fondo */
                    border-bottom: 2px solid #e5e7eb; /* Borde inferior más visible */
                    white-space: nowrap; /* Evita el salto de línea */
                    border-radius: 8px 8px 0 0; /* Bordes redondeados arriba */
                }
                .respuestas-table td {
                    background-color: #fff; /* Fondo blanco para las celdas */
                    padding: 14px 20px; /* Más espaciado */
                    font-size: 15px;
                    border-bottom: 1px solid #f3f4f6; /* Borde inferior sutil */
                    color: #4b5563; /* Texto gris oscuro */
                    white-space: nowrap; /* Evita el salto de línea */
                    border-radius: 6px; /* Bordes redondeados */
                }
                .respuestas-table tr:hover td {
                    background-color: #f3f4f6; /* Gris claro al pasar el ratón */
                }
                .badge {
                    background-color: #3b82f6; /* Azul similar al original */
                    color: white;
                    padding: 6px 10px;
                    border-radius: 9999px; /* Más redondeado */
                    font-weight: 600; /* Negrita */
                    font-size: 14px;
                }
            </style>
            <div style="max-height: 400px; overflow-y: auto;">
                <table class="respuestas-table">
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuesta Correcta</th>
                        </tr>
                    </thead>
                    <tbody>`;

        Object.entries(respuestasCorrectas).forEach(
            ([numPregunta, respuesta]) => {
                html += `
                <tr>
                    <td>${numPregunta}</td>
                    <td><span class="badge">${respuesta}</span></td>
                </tr>`;
            }
        );

        html += `</tbody></table></div>`;

        Swal.fire({
            title: `Respuestas correctas de ${examen.nombre_examen}`,
            html: html,
            icon: "info",
            width: "600px",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#d33",
            background: "bg-white",
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 relative group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {examen.nombre_examen}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="grid grid-cols-[auto_auto_1fr] items-center gap-2">
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
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline font-medium">Asignatura:</span>{" "}
                                    <span className="inline sm:hidden font-medium">Asig:</span>{" "}
                                    <span className="truncate">
                                        {asignatura?.nombre || "No especificada"}
                                    </span>
                                </div>
                            </div>
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
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="font-medium">Inicio:</span>{" "}
                                {new Date(examen.fecha_inicio).toLocaleString()}
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
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="font-medium">Fin:</span>{" "}
                                {new Date(examen.fecha_fin).toLocaleString()}
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
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <span className="font-medium">Subido:</span>{" "}
                                {new Date(
                                    examen.created_at
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <ExamenActionsMenu
                        examenId={examen.id}
                        ficheroProfesor={examen.fichero_profesor}
                        openMenuId={openMenuId}
                        toggleMenu={toggleMenu}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                        examen={examen}
                        tieneRelaciones={tieneRelaciones}
                    />
                </div>

                {examen.json_examen && (
                    <div
                        onClick={handleVerNotas}
                        className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 cursor-pointer"
                    >
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 transition-transform duration-200 hover:scale-105">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
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
                            Ver respuestas del examen
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
