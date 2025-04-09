"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function EditExamenForm({
    examen,
    onClose,
    asignaturas = [],
    clases = [],
    onSuccess,
}) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre_examen: examen.nombre_examen || "",
        fecha_inicio: formatForDateTimeLocal(examen.fecha_inicio),
        fecha_fin: formatForDateTimeLocal(examen.fecha_fin),
        asignatura_id: examen.asignatura_id || "",
        clase_id: examen.clase_id || "",
    });

    function formatForDateTimeLocal(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpia errores del campo si existe
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            const response = await fetch(`/profesor/examen/${examen.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({
                    nombre_examen: formData.nombre_examen,
                    fecha_inicio: formData.fecha_inicio,
                    fecha_fin: formData.fecha_fin,
                    asignatura_id: formData.asignatura_id,
                    clase_id: formData.clase_id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
                throw new Error("Error en la actualización");
            }

            const result = await response.json();
            if (typeof onSuccess === "function") {
                onSuccess(result.data);
            }

            Swal.fire({
                icon: "success",
                title: "¡Actualizado!",
                text: "El examen ha sido actualizado correctamente",
                timer: 3000,
                showConfirmButton: false,
            });

            onClose();
        } catch (error) {
            console.error("Error al actualizar:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error al actualizar el examen",
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Editar Examen
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Nombre Examen */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nombre del examen
                        </label>
                        <input
                            type="text"
                            name="nombre_examen"
                            value={formData.nombre_examen}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.nombre_examen && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.nombre_examen}
                            </p>
                        )}
                    </div>

                    {/* Asignatura */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Asignatura
                        </label>
                        <select
                            name="asignatura_id"
                            value={formData.asignatura_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Seleccione una asignatura</option>
                            {asignaturas?.map((asignatura) => (
                                <option
                                    key={asignatura.id}
                                    value={asignatura.id}
                                >
                                    {asignatura.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.asignatura_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.asignatura_id}
                            </p>
                        )}
                    </div>

                    {/* Clase */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Clase
                        </label>
                        <select
                            name="clase_id"
                            value={formData.clase_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Seleccione una clase</option>
                            {clases?.map((clase) => (
                                <option key={clase.id} value={clase.id}>
                                    {clase.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.clase_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.clase_id}
                            </p>
                        )}
                    </div>

                    {/* Fecha Inicio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Fecha de inicio
                        </label>
                        <input
                            type="datetime-local"
                            name="fecha_inicio"
                            value={formData.fecha_inicio}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.fecha_inicio && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.fecha_inicio}
                            </p>
                        )}
                    </div>

                    {/* Fecha Fin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Fecha de fin
                        </label>
                        <input
                            type="datetime-local"
                            name="fecha_fin"
                            value={formData.fecha_fin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.fecha_fin && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.fecha_fin}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                    >
                        {processing ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}
