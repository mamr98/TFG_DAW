import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Swal from 'sweetalert2';
import Buscador from "./Buscador";

function CrudUsuario() {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    const token = tokenMeta ? tokenMeta.getAttribute('content') : '';
    const [buscadorTipoUsuario, setBuscadorTipoUsuario] = useState(null);
    const [mostrarBuscador, setMostrarBuscador] = useState(false);
    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    const handleAccion = async (accion, tipoUsuario, id = null) => {
        // Implementar lógica para modificar/activar/desactivar
        console.log(`${accion} ${tipoUsuario} ${id || ''}`);
    };

    const crear = async (tipoUsuario) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: `Crear nuevo ${tipoUsuario}`,
            html:
                `<input id="swal-nombre" class="swal2-input" placeholder="Nombre">` +
                `<input id="swal-email" type="email" class="swal2-input" placeholder="Email">` +
                `<input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña">` +
                `<select id="swal-estado" class="swal2-input">
                    <option value="" disabled selected>Estado</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                const email = document.getElementById('swal-email').value;
                const password = document.getElementById('swal-password').value;
                const estado = document.getElementById('swal-estado').value;

                if (!nombre || !email || !password || estado === "") {
                    Swal.showValidationMessage('Todos los campos son obligatorios');
                    return;
                }

                return {
                    nombre,
                    email,
                    password,
                    estado: estado === "true"
                };
            }
        });

        if (!formValues) return;

        const ruta = tipoUsuario === "admin" ? "admin" : `admin/${tipoUsuario}`;

        try {
            const res = await fetch(`${ruta}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    name: formValues.nombre,
                    email: formValues.email,
                    password: formValues.password,
                    email_verified_at: "2025-04-05 07:23:57",
                    estado: formValues.estado,
                }),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log(`${tipoUsuario} creado:`, data);

            Swal.fire({
                icon: 'success',
                title: `${tipoUsuario} creado exitosamente`,
                text: `ID: ${data.id || "N/A"}`,
                confirmButtonColor: '#2563eb',
            });
        } catch (error) {
            console.error(`Error al crear ${tipoUsuario}:`, error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo crear el ${tipoUsuario}`,
                confirmButtonColor: '#d33',
            });
        }
    };

    const modificar = async (tipoUsuario, id) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        const ruta = tipoUsuario === "admin" ? `admin` : `admin/${tipoUsuario}`;

        try {
            const resObtener = await fetch(tipoUsuario+'/'+id, {
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
                    `<input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${usuarioActual.name || ''}">` +
                    `<input id="swal-email" type="email" class="swal2-input" placeholder="Email" value="${usuarioActual.email || ''}">` +
                    `<input id="swal-password" type="password" class="swal2-input" placeholder="Contraseña (dejar en blanco para no cambiar)">` +
                    `<select id="swal-estado" class="swal2-input">
                        <option value="" disabled>Estado</option>
                        <option value="true" ${usuarioActual.estado ? 'selected' : ''}>Activo</option>
                        <option value="false" ${!usuarioActual.estado ? 'selected' : ''}>Inactivo</option>
                    </select>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#2563eb',
                cancelButtonColor: '#d33',
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

    const estado = async (tipoUsuario, id) => {
        if (!token) {
            console.error("Token CSRF no encontrado");
            return;
        }

        const ruta = tipoUsuario === "admin" ? `admin/estado` : `admin/${tipoUsuario}/estado`;

        try {
            const res = await fetch(`${ruta}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                credentials: "same-origin",
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            console.log(`${tipoUsuario} borrado:`, data);
        } catch (error) {
            console.error(`Error al borrar ${tipoUsuario}:`, error);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-[#003049] rounded-lg shadow-xl">
            {/* Sección de Botones CRUD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-600 pb-8">
                {/* Sección Alumnos */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-white">Alumnos</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("alumno"); setMostrarBuscador(true); }}>
                        Buscar Alumnos
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("alumno")}>
                        Crear Alumno
                    </PrimaryButton>
                </div>

                {/* Sección Profesores */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-white">Profesores</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("profesor"); setMostrarBuscador(true); }}>
                        Buscar Profesores
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("profesor")}>
                        Crear Profesor
                    </PrimaryButton>
                </div>

                {/* Sección Administradores */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-white">Administradores</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("admin"); setMostrarBuscador(true); }}>
                        Buscar Admins
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("admin")}>
                        Crear Admin
                    </PrimaryButton>
                </div>
            </div>

            {/* Sección de Búsqueda y Resultados */}
            {mostrarBuscador && (
                <div className="space-y-8">
                    <Buscador
                        tipoUsuario={buscadorTipoUsuario}
                        nombreBusqueda={nombreBusqueda}
                        setNombreBusqueda={setNombreBusqueda}
                        onResultados={setResultados}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resultados.length > 0 ? (
                            resultados.map(usuario => (
                                <div key={usuario.id} className="bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-700">
                                    <div className="bg-blue-600 p-4">
                                        <h4 className="text-white text-lg font-semibold">
                                            {usuario.name}
                                        </h4>
                                        <p className="text-blue-100 text-sm">ID: {usuario.id}</p>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <p><span className="font-medium">Email:</span> {usuario.email}</p>
                                        <p>
                                            <span className="font-medium">Estado:</span> 
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${usuario.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {usuario.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-600 flex justify-end space-x-2">
                                        <button
                                            onClick={() => modificar(buscadorTipoUsuario, usuario.id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => estado( buscadorTipoUsuario, usuario.id)}
                                            className={`px-4 py-2 rounded-lg transition-colors ${
                                                usuario.estado 
                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                        >
                                            {usuario.estado ? "Desactivar" : "Activar"}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-6">
                                <p className="text-gray-500 dark:text-gray-300 text-lg">
                                    {nombreBusqueda 
                                        ? "No se encontraron resultados 😞"
                                        : "Ingresa un nombre para comenzar la búsqueda 🔍"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CrudUsuario;