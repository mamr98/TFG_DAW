import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import SubirImagen from "@/Components/hooks/SubirImagen";

export default function SubirImagenPage() {
    // Estado para almacenar los exámenes
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para mostrar el loading

    // Efecto que se ejecuta cuando el componente se monta
    useEffect(() => {
        // Hacemos el fetch a la API
        fetch('examenesAlumno')
            .then((response) => response.json())
            .then((data) => {
                setExamenes(data);  // Guardamos los exámenes en el estado
                setLoading(false);   // Cambiamos el estado de loading
            })
            .catch((error) => {
                console.error("Error al obtener los exámenes:", error);
                setLoading(false);   // En caso de error también cambiamos el estado de loading
            });
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Subir Examen
                </h2>
            }
        >
            <Head title="Subir Examen" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Aquí se subirá la imagen
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {loading ? (
                                <p>Cargando exámenes...</p>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold">Exámenes disponibles:</h3>
                                    <ul>
                                        {examenes.length > 0 ? (
                                            examenes.map((examen) => (
                                                <li key={examen.id} className="mb-4">
                                                    <div className="font-medium">{examen.nombre_examen}</div>                                                
                                                </li>
                                            ))
                                        ) : (
                                            <p>No hay exámenes disponibles.</p>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <SubirImagen />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
