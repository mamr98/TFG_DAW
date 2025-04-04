import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import SubirImagen from "@/Components/hooks/SubirImagen";

export default function SubirImagenPage() {
    return (
        <AuthenticatedLayout
                    header={
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Subir Imagen
                        </h2>
                    }
                >
                    <Head title="Subir Imagen" />
        
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
                                    <SubirImagen />
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
    );
}