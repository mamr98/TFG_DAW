import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import AnimatedList from "@/Components/hooks/AnimateList";
import Swal from "sweetalert2";

export default function SubirImagenPage() {
    const { alumnos, claseId } = usePage().props;
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const modificar = async (tipoUsuario, id) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        const ruta = tipoUsuario === "admin" ? `admin` : `admin/${tipoUsuario}`;

        try {
            const resObtener = await fetch(`${tipoUsuario}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
            });

            if (!resObtener.ok) throw new Error(`HTTP error! status: ${resObtener.status}`);

            const usuarioActual = await resObtener.json();

            const { value: formValues } = await Swal.fire({
                title: `Actualizar ${tipoUsuario}`,
                html:
                    `<input id="swal-nombre" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg" placeholder="Nombre" value="${usuarioActual.name || ''}">` +
                    `<input id="swal-email" type="email" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg" placeholder="Email" value="${usuarioActual.email || ''}">` +
                    `<input id="swal-password" type="password" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg" placeholder="Contraseña (dejar en blanco para no cambiar)">` +
                    `<select id="swal-estado" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg bg-white">
                        <option value="" disabled>Estado</option>
                        <option value="true" ${usuarioActual.estado ? 'selected' : ''}>Activo</option>
                        <option value="false" ${!usuarioActual.estado ? 'selected' : ''}>Inactivo</option>
                    </select>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#2563eb',
                cancelButtonColor: '#dc2626',
                customClass: {
                    popup: 'rounded-xl shadow-xl max-w-md w-full',
                    title: 'text-xl font-semibold',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg',
                    cancelButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg',
                },
                buttonsStyling: false,
                preConfirm: () => {
                    const nombre = document.getElementById('swal-nombre').value;
                    const email = document.getElementById('swal-email').value;
                    const password = document.getElementById('swal-password').value;
                    const estado = document.getElementById('swal-estado').value;

                    if (!nombre || !email || estado === "") {
                        Swal.showValidationMessage('Nombre, email y estado son obligatorios');
                        return;
                    }

                    return {
                        nombre,
                        email,
                        password,
                        estado: estado === "true",
                    };
                }
            });

            if (!formValues) return;

            const bodyData = {
                name: formValues.nombre,
                email: formValues.email,
                estado: formValues.estado,
            };

            if (formValues.password) {
                bodyData.password = formValues.password;
            }

            const res = await fetch(`${ruta}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
                body: JSON.stringify(bodyData),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log(`${tipoUsuario} actualizado:`, data);

            Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: `${tipoUsuario} actualizado correctamente.`,
                confirmButtonColor: '#2563eb',
            });

        } catch (error) {
            console.error(`Error al actualizar ${tipoUsuario}:`, error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al actualizar ${tipoUsuario}: ${error.message || error}`,
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Alumnos de
                </h2>
            }
        >
            <Head title="Notas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <AnimatedList
                                items={alumnos.map((alumno) => (
                                    <div
                                        key={alumno.id}
                                        className="flex items-center justify-between dark:bg-gray-800 text-white px-6 py-4 rounded-md mb-2 hover:bg-gray-800 transition-all"
                                    >
                                        <div className="w-1/3"></div>
                                        <div className="w-1/3 text-center font-medium">
                                            {alumno.name}
                                        </div>
                                        <div className="w-1/3 flex justify-end">
                                            <button
                                                onClick={() => modificar("alumno", alumno.id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Editar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                onItemSelect={(item, index) => console.log(item, index)}
                                showGradients={true}
                                enableArrowNavigation={true}
                                displayScrollbar={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
