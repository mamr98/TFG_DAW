import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";

function CrudUsuario() {


    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#003049] shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">CRUD Usuarios</h3>

            {/* Botón de crear */}
            <PrimaryButton children={"Crear Usuario"} className="mt-4" />

            {/* Botón de actualizar */}
            <PrimaryButton children={"Actualizar Usuario"} className="mt-4" />

            {/* Botón de borrar */}
            <PrimaryButton children={"Borrar Usuario"} className="mt-4" />
        </div>
    );
}

export default CrudUsuario;