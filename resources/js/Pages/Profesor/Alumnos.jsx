import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AnimatedList from "@/Components/hooks/AnimateList";

export default function SubirImagenPage() {
    const notas = [
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
        "Nombre del alumno",
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Notas
                </h2>
            }
        >
            <Head title="Notas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Aquí se subirá las notas de los alumnos
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <AnimatedList
                                items={[...notas]}
                                onItemSelect={(item, index) =>
                                    console.log(item, index)
                                }
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