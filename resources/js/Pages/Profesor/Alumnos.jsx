import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function Alumnos() {
    const { alumnos, claseId, claseNombre } = usePage().props;
    const [listaAlumnos, setListaAlumnos] = useState(alumnos);
    const [isReloading, setIsReloading] = useState(false);
    const basePath = window.location.origin +
        (window.location.pathname.includes("TFG_DAW") ? "/TFG_DAW/public" : "");

    const modificar = async (tipoUsuario, id, alumno) => {
        try {
            const resClases = await fetch(`${basePath}/clases`);

            if (!resClases.ok)
                throw new Error(`Error al obtener clases: ${resClases.status}`);
            const clases = await resClases.json();

            const claseActual = alumno.relacion_clase_alumno?.[0]?.id || null;

            const opcionesClases = clases
                .map((clase) => {
                    const selected = clase.id === claseActual ? "selected" : "";
                    return `<option value="${clase.id}" ${selected}>${clase.nombre}</option>`;
                })
                .join("");

            const { value: formValues } = await Swal.fire({
                title: "Asignar nueva clase",
                html: `
                    <input id="swal-nombre" class="w-full px-4 py-2 mb-3 text-gray-500 bg-gray-100 border rounded-lg" placeholder="Nombre" value="${alumno.name}" readonly>
                    <input id="swal-email" class="w-full px-4 py-2 mb-3 text-gray-500 bg-gray-100 border rounded-lg" placeholder="Email" value="${alumno.email}" readonly>
                    <select id="swal-clase" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg bg-white">
                        <option disabled value="">Selecciona una clase</option>
                        ${opcionesClases}
                    </select>
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Asignar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#2563eb",
                cancelButtonColor: "#dc2626",
                customClass: {
                    popup: "rounded-xl shadow-xl max-w-md w-full",
                    title: "text-xl font-semibold",
                    confirmButton:
                        "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2",
                    cancelButton:
                        "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-2",
                    actions: "flex justify-end gap-4",
                },
                buttonsStyling: false,
                preConfirm: () => {
                    const claseIdNueva =
                        document.getElementById("swal-clase").value;
                    if (!claseIdNueva) {
                        Swal.showValidationMessage(
                            "Debes seleccionar una clase"
                        );
                        return;
                    }

                    return {
                        claseIdNueva,
                        claseIdAntiguo: claseId,
                    };
                },
            });

            if (!formValues) return;

            const resUpdate = await axios.put(
                `${basePath}/alumnos/clase`,
                {
                    idAlumno: id,
                    idClaseAntiguo: formValues.claseIdAntiguo,
                    idClaseNueva: formValues.claseIdNueva,
                }
            );

            Swal.fire({
                icon: "success",
                title: "Clase actualizada",
                text: "La clase del alumno ha sido actualizada correctamente.",
                confirmButtonColor: "#2563eb",
            });
        } catch (error) {
            console.error("Error en la modificación:", error);
            const errorMessage = error.response?.data?.message || error.message || "Ha ocurrido un error";
            const validationErrors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: validationErrors ? Object.values(validationErrors).flat().join('\n') : errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }

        recargarAlumnos();
    };

    const anyadirAlumno = async (alumnoId, alumno) => {

        try {
            const res = await axios.post(
                `${basePath}/alumnos/asignar`,
                { alumnoId, claseId }
            );

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: `El alumno ${alumno.name} ha sido asignado a la clase.`,
                confirmButtonColor: "#2563eb",
            });
        } catch (error) {
            console.error("Error al añadir alumno:", error);
            const errorMessage = error.response?.data?.message || error.message || "Ha ocurrido un error";
            const validationErrors = error.response?.data?.errors;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: validationErrors ? Object.values(validationErrors).flat().join('\n') : errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }

        recargarAlumnos();
    };

    const handleAsignarAlumnos = async () => {

        try {
            const response = await fetch(`${basePath}/alumnos/mostrar`);

            if (!response.ok) throw new Error("Error al cargar alumnos.");

            const alumnosDisponibles = await response.json();

            if (!alumnosDisponibles.length) {
                Swal.fire(
                    "Información",
                    "No hay alumnos para asignar.",
                    "info"
                );
                return;
            }

            const contenedor = document.createElement("div");
            contenedor.style.maxHeight = "400px";
            contenedor.style.overflowY = "auto";

            alumnosDisponibles.forEach((alumno) => {
                const fila = document.createElement("div");
                fila.style.display = "flex";
                fila.style.justifyContent = "space-between";
                fila.style.alignItems = "center";
                fila.style.marginBottom = "10px";
                fila.style.borderBottom = "1px solid #eee";
                fila.style.paddingBottom = "6px";

                const info = document.createElement("div");
                info.innerHTML = `<strong>${alumno.email}</strong><br>`;

                const btn = document.createElement("button");
                btn.textContent = "Asignar";
                btn.style.backgroundColor = "#3b82f6";
                btn.style.color = "white";
                btn.style.border = "none";
                btn.style.padding = "6px 12px";
                btn.style.borderRadius = "4px";
                btn.style.cursor = "pointer";

                btn.onclick = async () => {
                    Swal.close();
                    await anyadirAlumno(alumno.id, alumno);
                };

                fila.appendChild(info);
                fila.appendChild(btn);
                contenedor.appendChild(fila);
            });

            Swal.fire({
                title: "Alumnos Disponibles para Asignar",
                html: contenedor,
                width: 550,
                showConfirmButton: true,
                confirmButtonText: "Cerrar",
                confirmButtonColor: "#6b7280",
            });
        } catch (error) {
            console.error("Error en asignación:", error);
            Swal.fire("Error", error.message, "error");
        }

        
    };

    const recargarAlumnos = async () => {
        setIsReloading(true);
        try {
            const response = await fetch(
                `${basePath}/api/alumnos/clase/${claseId}`
            );
            if (response.ok) {
                const data = await response.json();
                setListaAlumnos(data);
            } else {
                Swal.fire(
                    "Error",
                    "No se pudieron obtener los alumnos",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "Hubo un problema de conexión", "error");
        } finally {
            setIsReloading(false);
        }
    };

    const eliminarAlumno = async (idAlumno, alumno) => {
        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: `¿Quieres quitar a ${alumno.name} de esta clase?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, quitar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmacion.isConfirmed) return;

        try {
            await axios.post(
                `${basePath}/alumnos/quitar`,
                { alumnoId: idAlumno, claseId }
            );

            Swal.fire({
                icon: "success",
                title: "Alumno eliminado",
                text: `${alumno.name} fue quitado de la clase correctamente.`,
                confirmButtonColor: "#2563eb",
            });

            recargarAlumnos();
        } catch (error) {
            console.error("Error al eliminar alumno:", error);
            const errorMessage = error.response?.data?.message || error.message || "Ocurrió un error al quitar al alumno";
            const validationErrors = error.response?.data?.errors;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: validationErrors ? Object.values(validationErrors).flat().join('\n') : errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Alumnos de {claseNombre}
                </h2>
            }
        >
            <Head title="Alumnos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* BOTONES */}
                    <div className="flex items-center gap-4 mb-6">
                        <PrimaryButton
                            onClick={handleAsignarAlumnos}
                            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 transition-transform duration-200 hover:scale-110"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="hidden sm:inline">Asignar Alumno</span>
                        </PrimaryButton>

                        <button
                            onClick={recargarAlumnos}
                            disabled={isReloading}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${isReloading ? "animate-spin" : ""}`}
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

                    {/* LISTA DE ALUMNOS */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {listaAlumnos.map((alumno) => (
                                <div
                                    key={alumno.id}
                                    className="rounded-lg bg-white overflow-hidden shadow-md dark:bg-gray-700 dark:text-white text-black"
                                >
                                    <div className="bg-gradient-to-r to-teal-500 from-emerald-400  p-3">
                                        <h2 className="text-lg font-semibold">
                                            {alumno.name}
                                        </h2>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <p>
                                            <span className="font-medium">Email:</span>{" "}
                                            {alumno.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium">Estado:</span>
                                            <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                Activo
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex justify-center bg-gray-50 gap-4 px-4 py-3 dark:bg-gray-600">
                                        <button
                                            onClick={() =>
                                                modificar("alumno", alumno.id, alumno)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                eliminarAlumno(alumno.id, alumno)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
