import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Alumnos() {
    const { alumnos, claseId, claseNombre } = usePage().props;
    const token = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");
    const basePath = `${window.location.origin}/public`;
    const modificar = async (tipoUsuario, id, alumno) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        try {
            ///TFG_DAW/public/alumnos/clases
            // Obtener todas las clases
            
            const basePath = `${window.location.origin}/public`;
            const resClases = await fetch(`${basePath}/alumnos/clases`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
            });

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
                        "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2", // Añadido mr-2 para margen derecho
                    cancelButton:
                        "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-2", // Añadido ml-2 para margen izquierdo
                    actions: "flex justify-end gap-4", // Añadido para separar los botones
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

            ///TFG_DAW/public/alumnos/clase
            // Enviar actualización
            console.log("Clase antigua:", formValues.claseIdAntiguo);
            console.log("Clase nueva:", formValues.claseIdNueva);

            
            const resUpdate = await fetch(`${basePath}/alumnos/clase`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    idAlumno: id,
                    idClaseAntiguo: formValues.claseIdAntiguo,
                    idClaseNueva: formValues.claseIdNueva,
                }),
            });

            if (!resUpdate.ok)
                throw new Error(
                    `Error al actualizar clase: ${resUpdate.status}`
                );

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

    /* const handleAsignarAlumnos = (alumnos) => {
        if (alumnos.length === 0) {
          Swal.fire({
            title: '<span class="text-gray-800 font-semibold">No hay alumnos</span>',
            html: '<div class="flex items-center justify-center p-4 bg-amber-50 rounded-lg mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><p class="text-gray-600">Este examen aún no tiene notas registradas.</p>',
            showConfirmButton: true,
            confirmButtonColor: "#10b981",
            confirmButtonText: '<span class="px-2">Entendido</span>',
            customClass: {
              popup: "rounded-xl shadow-xl border border-gray-100",
            },
            background: "#ffffff",
          })
          return
        } */

    const displayStudentAssignmentModal = (
        studentList,
        currentToken,
        modificarFn
    ) => {
        const modalTitle = "Alumnos Disponibles para Asignar";
        const html = `
                <style>
                  .notas-container { max-height: 400px; overflow-y: auto; padding: 0 4px; margin-top: 16px; }
                  .notas-header { display: flex; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
                  .notas-icon { background-color: rgba(16, 185, 129, 0.1); border-radius: 50%; padding: 10px; margin-right: 12px; }
                  .notas-title { font-size: 16px; font-weight: 600; color: #374151; }
                  .notas-table { width: auto; min-width: 100%; border-collapse: separate; border-spacing: 0 8px; font-family: 'Segoe UI', sans-serif; }
                  .notas-table th { color: #4b5563; font-weight: 600; padding: 12px 20px; text-align: left; font-size: 14px; background-color: #f9fafb; border-bottom: 2px solid #e5e7eb; white-space: nowrap; }
                  .notas-table td { padding: 14px 20px; font-size: 15px; border-bottom: 1px solid #f3f4f6; color: #4b5563; white-space: nowrap; }
                  .notas-table tr:hover td { background-color: #f3f4f6; }
                  .notas-table-container { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; scroll-padding: 50% 0 0 50%; }
                  .alumno-name-modal { display: flex; align-items: center; }
                  .alumno-avatar-modal { width: 28px; height: 28px; border-radius: 50%; background-color: #e5e7eb; display: flex; align-items: center; justify-content: center; margin-right: 10px; color: #6b7280; font-weight: 600; font-size: 12px; }
                  .btn-asignar-modal { background-color: #3b82f6; color: white; padding: 6px 12px; border-radius: 0.375rem; font-size: 0.875rem; line-height: 1.25rem; }
                  .btn-asignar-modal:hover { background-color: #2563eb; }
                </style>
                <div class="notas-header">
                  <div class="notas-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div>
                    <div class="notas-title">${modalTitle}</div>
                  </div>
                </div>
                <div class="notas-container">
                  <div class="notas-table-container">
                    <table class="notas-table">
                      <thead>
                        <tr>
                          <th>Alumno</th>
                          <th style="text-align: center;">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${studentList
                            .map(
                                (alumno) => `
                              <tr>
                                <td>
                                  <div class="alumno-name-modal">
                                    ${alumno.name}
                                  </div>
                                </td>
                                <td style="text-align: center;">
                                  <button class="btn-asignar-modal" data-alumno-id="${
                                      alumno.id
                                  }">Asignar</button>
                                </td>
                              </tr>
                            `
                            )
                            .join("")}
                      </tbody>
                    </table>
                  </div>
                </div>
            `;

        Swal.fire({
            html,
            showConfirmButton: true,
            confirmButtonText: '<span class="px-3">Cerrar</span>',
            confirmButtonColor: "#6b7280", // Gray color for close button
            width: "700px",
            padding: "24px",
            customClass: {
                popup: "rounded-xl shadow-xl border border-gray-100",
                confirmButton: "rounded-lg text-sm font-medium",
                htmlContainer: "text-left",
            },
            background: "#ffffff",
            backdrop: "rgba(0,0,0,0.4)",
            didOpen: () => {
                const popup = Swal.getPopup();
                const container = popup.querySelector(".notas-table-container");

                if (window.innerWidth <= 768) {
                    // Adjusted breakpoint
                    popup.style.width = "95%";
                    popup.style.maxWidth = "100%";
                    if (container) {
                        setTimeout(() => {
                            // Ensure DOM is ready
                            container.scrollLeft =
                                (container.scrollWidth -
                                    container.clientWidth) /
                                2;
                            const resizeObserver = new ResizeObserver(() => {
                                container.scrollLeft =
                                    (container.scrollWidth -
                                        container.clientWidth) /
                                    2;
                            });
                            resizeObserver.observe(container);
                            popup.addEventListener("close", () =>
                                resizeObserver.disconnect()
                            );
                        }, 150);
                    }
                }

                popup
                    .querySelectorAll(".btn-asignar-modal")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            const alumnoId = button.dataset.alumnoId;
                            const alumnoSeleccionado = studentList.find(
                                (a) => a.id.toString() === alumnoId
                            );
                            if (alumnoSeleccionado) {
                                // Assuming 'modificarFn' is the 'modificar' function from the component scope
                                // It needs 'tipoUsuario', 'id', and the 'alumno' object
                                modificarFn(
                                    "alumno",
                                    alumnoSeleccionado.id,
                                    alumnoSeleccionado
                                );
                            }
                            Swal.close();
                        });
                    });
            },
        });
    };

    const handleAsignarAlumnos = async () => {
        if (!token) {
            console.error(
                "Token CSRF no encontrado para handleAsignarAlumnosClick"
            );
            Swal.fire(
                "Error",
                "No se pudo realizar la operación. Falta token de seguridad.",
                "error"
            );
            return;
        }
        try {
            // Fetch all users that can be students. Adjust endpoint as necessary.
            // This endpoint should return users who are students or can be students.
            // Example: /usuarios?role=alumno or similar
            const response = await fetch(
                `${basePath}/alumnos/clases`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": token,
                        Accept: "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                        `Error al cargar lista de alumnos: ${response.status}`
                );
            }

            const todosLosAlumnos = await response.json();

            if (!todosLosAlumnos || todosLosAlumnos.length === 0) {
                Swal.fire(
                    "Información",
                    "No hay alumnos disponibles para asignar en el sistema.",
                    "info"
                );
                return;
            }

            // Pass the fetched students, token, and modificar function to the modal display function
            displayStudentAssignmentModal(todosLosAlumnos, token, modificar);
        } catch (error) {
            console.error("Error en handleAsignarAlumnosClick:", error);
            Swal.fire(
                "Error",
                error.message || "No se pudo cargar la lista de alumnos.",
                "error"
            );
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

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {alumnos.map((alumno) => (
                                <div
                                    key={alumno.id}
                                    className="rounded-lg overflow-hidden shadow-md bg-gray-700 text-white"
                                >
                                    <div className="dark:bg-emerald-600 p-3">
                                        <h2 className="text-lg font-semibold">
                                            {alumno.name}
                                        </h2>
                                        <p className="text-sm">
                                            ID: {alumno.id}
                                        </p>
                                    </div>

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

                                    <div className="flex justify-center gap-4 px-4 py-3 bg-gray-600">
                                        <button
                                            onClick={() =>
                                                modificar(
                                                    "alumno",
                                                    alumno.id,
                                                    alumno
                                                )
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
