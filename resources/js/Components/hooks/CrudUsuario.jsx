import React from "react";
import PrimaryButton from "../PrimaryButton";

function CrudUsuario() {
    return (
        <div className="flex p-6 bg-[#003049] shadow-md rounded-lg">
            {/* Columna izquierda - Alumnos */}
            <div className="w-1/2 pr-2 border-r border-gray-600 flex justify-center">
                <div className="flex flex-col items-center w-full max-w-xs"> {/* max-w-xs limita el ancho del contenido */}
                    <h3 className="text-lg font-semibold text-white mb-4">CRUD Alumnos</h3>

                    <PrimaryButton children={"Buscar Alumnos"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Crear Alumnos"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Actualizar Alumnos"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Borrar Alumnos"} className="mt-4 w-full flex justify-center items-center" />
                </div>
            </div>

            {/* Columna del medio - Profesores */}
            <div className="w-1/2 pl-2 flex justify-center">
                <div className="flex flex-col items-center w-full max-w-xs">
                    <h3 className="text-lg font-semibold text-white mb-4">CRUD Profesores</h3>

                    <PrimaryButton children={"Buscar Profesores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Crear Profesores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Actualizar Profesores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Borrar Profesores"} className="mt-4 w-full flex justify-center items-center" />
                </div>
            </div>

            {/* Columna derecha - Administrador */}
            <div className="w-1/2 pr-2 border-l border-gray-600 flex justify-center">
                <div className="flex flex-col items-center w-full max-w-xs">
                    <h3 className="text-lg font-semibold text-white mb-4">CRUD Adminitradores</h3>

                    <PrimaryButton children={"Buscar Adminitradores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Crear Adminitradores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Actualizar Adminitradores"} className="mt-4 w-full flex justify-center items-center" />
                    <PrimaryButton children={"Borrar Adminitradores"} className="mt-4 w-full flex justify-center items-center" />
                </div>
            </div>
        </div>
    );
}

export default CrudUsuario;