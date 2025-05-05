import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import AnimatedList from "@/Components/hooks/AnimateList";
import Swal from "sweetalert2";

export default function SubirImagenPage() {
    const { alumnos, claseId, claseNombre } = usePage().props;
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const modificar = async (tipoUsuario, id) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        try {
            // Obtener datos del alumno
            const resObtener = await fetch(`${tipoUsuario}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
            });

            if (!resObtener.ok) throw new Error(`Error al obtener datos: ${resObtener.status}`);
            const alumno = await resObtener.json();

            // Obtener todas las clases
            const resClases = await fetch("/alumnos/clases", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
            });

            if (!resClases.ok) throw new Error(`Error al obtener clases: ${resClases.status}`);
            const clases = await resClases.json();

            // Generar opciones del select
            const opcionesClases = clases
                .map(clase => {
                    const selected = alumno.relacion_clase_alumno?.some(c => c.id === clase.id) ? "selected" : "";
                    return `<option value="${clase.id}" ${selected}>${clase.nombre}</option>`;
                })
                .join("");

            // Mostrar el SweetAlert
            const { value: formValues } = await Swal.fire({
                title: "Asignar nueva clase",
                html: `
                    <input id="swal-nombre" class="w-full px-4 py-2 mb-3 text-gray-500 bg-gray-100 border rounded-lg" placeholder="Nombre" value="${alumno.name}" readonly>
                    <input id="swal-email" class="w-full px-4 py-2 mb-3 text-gray-500 bg-gray-100 border rounded-lg" placeholder="Email" value="${alumno.email}" readonly>
                    <select id="swal-clase" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg bg-white">
                        <option disabled selected value="">Selecciona una clase</option>
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
                    confirmButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg",
                    cancelButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg",
                },
                buttonsStyling: false,
                preConfirm: () => {
                    const claseId = document.getElementById("swal-clase").value;

                    if (!claseId) {
                        Swal.showValidationMessage("Debes seleccionar una clase");
                        return;
                    }

                    return { claseId };
                },
            });

            if (!formValues) return;

            // Enviar actualización
            const resUpdate = await fetch(`/ruta/para/actualizar/clase`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    idAlumno: id,
                    idClase: formValues.claseId,
                }),
            });

            if (!resUpdate.ok) throw new Error(`Error al actualizar clase: ${resUpdate.status}`);

            Swal.fire({
                icon: "success",
                title: "Clase actualizada",
                text: "La clase del alumno ha sido actualizada correctamente.",
                confirmButtonColor: "#2563eb",
            });

        } catch (error) {
            console.error("Error en la modificación:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Ha ocurrido un error",
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {alumnos.map((alumno) => (
                                <div
                                    key={alumno.id}
                                    className="rounded-lg overflow-hidden shadow-md bg-gray-700 text-white"
                                >
                                    {/* Header */}
                                    <div className="dark:bg-emerald-600 p-3">
                                        <h2 className="text-lg font-semibold">
                                            {alumno.name}
                                        </h2>
                                        <p className="text-sm">
                                            ID: {alumno.id}
                                        </p>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 space-y-2">
                                        <p>
                                            <span className="font-medium">
                                                Email:
                                            </span>{" "}
                                            {alumno.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium">
                                                Estado:
                                            </span>
                                            <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                Activo
                                            </span>
                                        </p>
                                    </div>

                                    {/* Botones */}
                                    <div className="flex justify-center gap-4 px-4 py-3 bg-gray-600">
                                        <button
                                            onClick={() =>
                                                modificar("alumno", alumno.id)
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                        >
                                            Editar
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