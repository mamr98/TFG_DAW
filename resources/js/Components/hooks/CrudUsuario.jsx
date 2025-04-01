import React from "react";
import PrimaryButton from "../PrimaryButton";

function CrudUsuario() {
    return (
        <div className="flex p-6 bg-[#003049] shadow-md rounded-lg">
            {/* Columna izquierda - Alumnos */}
            <div className="w-1/2 pr-4"> {/* pr-4 para un poco de espacio entre columnas */}
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-white mb-4">CRUD Alumnos</h3>

                    {/* Botón de crear */}
                    <PrimaryButton children={"Crear Alumnos"} className="mt-4 w-full" />

                    {/* Botón de actualizar */}
                    <PrimaryButton children={"Actualizar Alumnos"} className="mt-4 w-full" />

                    {/* Botón de borrar */}
                    <PrimaryButton children={"Borrar Alumnos"} className="mt-4 mb-14 w-full" />
                </div>
            </div>

            {/* Columna derecha - Profesores */}
            <div className="w-1/2 pl-4"> {/* pl-4 para un poco de espacio entre columnas */}
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-white mb-4">CRUD Profesores</h3>

                    {/* Botón de crear */}
                    <PrimaryButton children={"Crear Profesores"} className="mt-4 w-full" />

                    {/* Botón de actualizar */}
                    <PrimaryButton children={"Actualizar Profesores"} className="mt-4 w-full" />

                    {/* Botón de borrar */}
                    <PrimaryButton children={"Borrar Profesores"} className="mt-4 w-full" />
                </div>
            </div>
        </div>
    );
}

export default CrudUsuario;