import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import Swal from 'sweetalert2';
import Buscador from "./Buscador";
import axios from "axios";

function CrudUsuario() {
    const [buscadorTipoUsuario, setBuscadorTipoUsuario] = useState(null);
    const [mostrarBuscador, setMostrarBuscador] = useState(false);
    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    const crear = async (tipoUsuario) => {

        const { value: formValues } = await Swal.fire({
            title: `Crear nuevo ${tipoUsuario}`,
            html:
                `<input id="swal-nombre" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Nombre">` +
                `<input id="swal-email" type="email" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Email">` +
                `<input id="swal-password" type="password" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Contraseña">` +
                `<select id="swal-estado" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent appearance-none bg-white">
                    <option value="" disabled selected>Estado</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb', // blue-600
            cancelButtonColor: '#dc2626', // red-600
            customClass: {
                container: 'font-sans',
                popup: 'bg-gray-50 dark:bg-gray-600 rounded-xl shadow-xl border-0 max-w-md mx-auto w-full sm:w-11/12 md:w-2/3 lg:w-1/2',
                header: 'border-b pb-3',
                title: 'text-xl font-semibold text-black dark:text-white',
                closeButton: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
                content: 'pt-4 px-6',
                confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-white px-5 py-2.5 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5',
                cancelButton: 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white px-5 py-2.5 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5',
                actions: 'gap-3 sm:flex-row flex-col w-full sm:w-auto',
                footer: 'mt-4 text-sm text-gray-500',
                validationMessage: 'my-2 text-sm text-red-600 bg-red-100 p-2 rounded-lg'
            },
            buttonsStyling: false,
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
                const res = await axios.post(`${ruta}`, {
                name: formValues.nombre,
                email: formValues.email,
                password: formValues.password,
                email_verified_at: "2025-04-05 07:23:57",
                estado: formValues.estado,
            });

            const data = res.data;
            console.log(`${tipoUsuario} creado:`, data);

            Swal.fire({
                icon: 'success',
                title: `${tipoUsuario} creado exitosamente`,
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

        const ruta = tipoUsuario === "admin" ? `admin` : `admin/${tipoUsuario}`;

        try {
            const resObtener = await fetch(tipoUsuario+'/'+id);

            if (!resObtener.ok) throw new Error(`HTTP error! status: ${resObtener.status}`);

            const usuarioActual = await resObtener.json();

            const { value: formValues } = await Swal.fire({
                title: `Actualizar ${tipoUsuario}`,
                html:
                    `<input id="swal-nombre" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Nombre" value="${usuarioActual.name || ''}">` +
                    `<input id="swal-email" type="email" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Email" value="${usuarioActual.email || ''}">` +
                    `<input id="swal-password" type="password" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" placeholder="Contraseña (dejar en blanco para no cambiar)">` +
                    `<select id="swal-estado" class="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent appearance-none bg-white">
                        <option value="" disabled>Estado</option>
                        <option value="true" ${usuarioActual.estado ? 'selected' : ''}>Activo</option>
                        <option value="false" ${!usuarioActual.estado ? 'selected' : ''}>Inactivo</option>
                    </select>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#2563eb', // blue-600
                cancelButtonColor: '#dc2626', // red-600
                customClass: {
                    container: 'font-sans',
                    popup: 'bg-gray-50 dark:bg-gray-600 rounded-xl shadow-xl border-0 max-w-md mx-auto w-full sm:w-11/12 md:w-2/3 lg:w-1/2',
                    header: 'border-b pb-3',
                    title: 'text-xl font-semibold text-black dark:text-white',
                    closeButton: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    content: 'pt-4 px-6',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-white px-5 py-2.5 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5',
                    cancelButton: 'bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-white px-5 py-2.5 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5',
                    actions: 'gap-3 sm:flex-row flex-col w-full sm:w-auto',
                    footer: 'mt-4 text-sm text-gray-500'
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

            const res = await axios.put(`${ruta}/${id}`, bodyData);

            const data = res.data;
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

        const ruta = tipoUsuario === "admin" ? `admin/estado` : `admin/${tipoUsuario}/estado`;

        try {
            const res = await axios.put(`${ruta}/${id}`, {});

            const data = res.data;
            console.log(`${tipoUsuario} borrado:`, data);
        } catch (error) {
            console.error(`Error al borrar ${tipoUsuario}:`, error);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Sección de Botones CRUD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 mt-8">
                {/* Sección Alumnos */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Alumnos</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("alumno"); setMostrarBuscador(true); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
                        Buscar Alumnos
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("alumno")}className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
                        Crear Alumno
                    </PrimaryButton>
                </div>

                {/* Sección Profesores */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profesores</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("profesor"); setMostrarBuscador(true); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
                        Buscar Profesores
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("profesor")} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
                        Crear Profesor
                    </PrimaryButton>
                </div>

                {/* Sección Administradores */}
                <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Administradores</h3>
                    <PrimaryButton onClick={() => { setBuscadorTipoUsuario("admin"); setMostrarBuscador(true); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
                        Buscar Admins
                    </PrimaryButton>
                    <PrimaryButton onClick={() => crear("admin")} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-center w-full px-6 py-3 text-base">
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
                                    <div className="bg-emerald-500 dark:bg-emerald-600 p-4">
                                        <h4 className="text-white text-lg font-semibold">
                                            {usuario.name}
                                        </h4>
                                        {/* <p className="text-blue-100 text-sm">ID: {usuario.id}</p> */}
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