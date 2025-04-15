import React, { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { toast } from "react-toastify";

function SubirImagen({ examenId }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.match("image.*")) {
                toast.error(
                    "Por favor, selecciona un archivo de imagen válido"
                );
                return;
            }

            // Validar tamaño (ejemplo: máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("La imagen no debe exceder los 5MB");
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage) {
            toast.error("Por favor, selecciona una imagen primero");
            return;
        }
    
        setIsUploading(true);
    
        try {
            const formData = new FormData();
            const fileInput = document.querySelector('input[type="file"]');
            formData.append("imagen", fileInput.files[0]);
            formData.append("examen_id", examenId);
    
            const response = await fetch(`alumno/examen/${examenId}`, {
                method: "POST",
                body: formData, // ¡Descomenta esta línea!
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                    "Accept": "application/json" // Añade esto para esperar JSON
                },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Error en la subida");
            }
    
            toast.success(data.message || "Examen subido correctamente");
            setSelectedImage(null);
            fileInput.value = "";
    
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            toast.error(error.message || "Error al subir la imagen");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Subir examen resuelto
            </h3>

            {/* Vista previa */}
            {selectedImage && (
                <div className="mb-6 relative group">
                    <img
                        src={selectedImage}
                        alt="Vista previa del examen"
                        className="w-full h-64 object-contain rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Quitar imagen"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* Área de subida */}
            <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">
                            Haz clic para subir
                        </span>{" "}
                        o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG o JPG (MAX. 5MB)
                    </p>
                </div>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg, application/pdf"
                />
            </label>

            {/* Botón de acción */}
            <div className="mt-6 flex justify-end space-x-3">
                {selectedImage && (
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        Cancelar
                    </button>
                )}
                <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!selectedImage || isUploading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                    {isUploading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Subiendo...
                        </>
                    ) : (
                        "Subir examen"
                    )}
                </PrimaryButton>
            </div>
        </div>
    );
}

export default SubirImagen;
