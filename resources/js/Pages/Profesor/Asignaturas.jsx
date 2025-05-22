import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton";
import React, { useState} from "react";
import axios from "axios";

export default function Asignaturas({ asignaturas }) {
    const [listaAsignaturas, setListaAsignaturas] = useState(asignaturas);
    const [isReloading, setIsReloading] = useState(false);

    const basePath = window.location.origin +
        (window.location.pathname.includes("TFG_DAW") ? "/TFG_DAW/public" : "");

    const modificar = async (asignatura) => {
        const { value: formValues } = await Swal.fire({
            title: "Modificar Asignatura",
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre" value="${asignatura.nombre}">
                <input id="id" type="hidden" value="${asignatura.id}">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value;
                if (!nombre) {
                    Swal.showValidationMessage("El nombre no puede estar vacío");
                    return false;
                }
                if (nombre.length > 45) { // Agrega validación de longitud si es necesario
                    Swal.showValidationMessage("El nombre no puede superar los 45 caracteres");
                    return false;
                }
                return {
                    nombre: nombre,
                    id: document.getElementById("id").value,
                };
            },
        });

        if (!formValues) return; // Salir si el usuario cancela o la preConfirmación falla

        try {
            // Axios envía 'formValues' como JSON y maneja CSRF automáticamente
            await axios.put(`${basePath}/asignaturas/modificar`, formValues);

            Swal.fire("Éxito", "Asignatura modificada correctamente", "success");
            recargarAsignaturas(); // Actualizar después de modificar
        } catch (error) {
            console.error("Error al modificar asignatura:", error);
            // Capturar errores de validación de Laravel (código 422) o errores generales
            const errorMessage = error.response?.data?.message || "No se pudo modificar la asignatura";
            const validationErrors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: validationErrors ? Object.values(validationErrors).flat().join('\n') : errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }
    };

    const eliminarAsignatura = async (idEliminar) => {
        const { isConfirmed } = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33", // Añadido para mejor UX
            cancelButtonColor: "#3085d6",
        });

        if (!isConfirmed) return; // Si no confirma, salir

        try {
            // Axios automáticamente lanza un error si el estado no es 2xx
            await axios.delete(`${basePath}/asignaturas/eliminar`, {
                data: { id: idEliminar } // Datos para la petición DELETE
            });

            Swal.fire("Eliminado", "Asignatura eliminada correctamente", "success");
            recargarAsignaturas(); // Actualizar después de eliminar
        } catch (error) {
            console.error("Error al eliminar asignatura:", error);
            const errorMessage = error.response?.data?.message || "No se pudo eliminar la asignatura";
            Swal.fire("Error", errorMessage, "error");
        }
    };

    const handleCrearAsignatura = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Crear Asignatura",
            html: `
                <input id="nombre" class="swal2-input" placeholder="Nombre">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value;
                if (!nombre) {
                    Swal.showValidationMessage("El nombre no puede estar vacío");
                    return false;
                }
                if (nombre.length > 45) {
                    Swal.showValidationMessage("El nombre no puede superar los 45 caracteres");
                    return false;
                }
                return { nombre };
            },
        });

        if (!formValues) return; // Salir si el usuario cancela o la preConfirmación falla

        try {
            // Axios automáticamente maneja Content-Type y CSRF
            await axios.post(`${basePath}/asignaturas/crear`, formValues);

            Swal.fire("Éxito", "Asignatura creada correctamente", "success");
            recargarAsignaturas(); // Actualizar después de crear
        } catch (error) {
            console.error("Error al crear asignatura:", error);
            const errorMessage = error.response?.data?.message || "No se pudo crear la asignatura";
            const validationErrors = error.response?.data?.errors;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: validationErrors ? Object.values(validationErrors).flat().join('\n') : errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }
    };

    const recargarAsignaturas = async () => {
        setIsReloading(true);
        try {
            const response = await fetch(`${basePath}/asignaturas`);
            if (response.ok) {
                const data = await response.json();
                setListaAsignaturas(data);
            } else {
                Swal.fire("Error", "No se pudieron obtener las asignaturas", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Hubo un problema de conexión", "error");
        } finally {
            setIsReloading(false);
        }
    };

    const renderizarAsignaturas = () => {
        if (listaAsignaturas.length === 0) {
            return <p className="text-gray-400">No hay asignaturas disponibles.</p>;
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {listaAsignaturas.map((asignatura) => (
                    <div
                        key={asignatura.id}
                        className="rounded-lg overflow-hidden shadow-md bg-gray-700 text-white"
                    >
                        <div className="dark:bg-emerald-600 p-3">
                            <h2 className="text-lg font-semibold">
                                Asignatura: <br /> {asignatura.nombre}
                            </h2>
                        </div>

                        <div className="flex justify-center gap-4 px-4 py-3 bg-gray-600">
                            <button
                                onClick={() => modificar(asignatura)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminarAsignatura(asignatura.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Asignaturas
                </h2>
            }
        >
            <Head title="Asignaturas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <PrimaryButton onClick={handleCrearAsignatura}>
                            Crear Asignatura
                        </PrimaryButton>

                        <button
                            onClick={recargarAsignaturas}
                            disabled={isReloading}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105"
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

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        {renderizarAsignaturas()}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
