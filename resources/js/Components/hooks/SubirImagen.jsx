import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";

function SubirImagen() {
    const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Archivo seleccionado:", file.name);
            // Crear una URL temporal para la vista previa
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#003049] shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Sube aquí tu imagen</h3>

            {/* Vista previa de la imagen */}
            {selectedImage && (
                <div className="mb-4">
                    <img
                        src={selectedImage}
                        alt="Vista previa"
                        className="max-w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                </div>
            )}

            {/* Input de archivo */}
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-blue-600 rounded-lg shadow tracking-wide border border-blue cursor-pointer hover:bg-blue-100 hover:text-blue-700">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Selecciona un archivo</span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </label>

            {/* Botón de subir */}
            <PrimaryButton children={"Subir Imagen"} className="mt-4" />
        </div>
    );
}

export default SubirImagen;