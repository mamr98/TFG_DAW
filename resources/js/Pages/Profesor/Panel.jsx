import { Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { router } from '@inertiajs/react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';

export default function PanelProfesor() {
    const { examenes, flash } = usePage().props;

    console.log('Datos recibidos:', { examenes, flash }); // Para depuración

    // Efecto para mostrar el modal cuando hay un mensaje flash
    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                title: 'Éxito',
                text: flash.success,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#2563eb', // Azul similar al de tu botón
            });
        }
    }, [flash]);

    // Función para manejar el clic en el botón "Subir nuevo examen"
    const handleNuevoExamen = () => {
        Swal.fire({
            title: '¿Subir nuevo examen?',
            text: 'Serás redirigido al formulario para crear un nuevo examen',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit(route('profesor.examen'));
            }
        });
    };


    return (

        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Panel Profesor
                </h2>
            }
        >
                    <Head title="Panel Profesor" />
        <div className="max-w-4xl mx-auto p-6">

            {/* Botón de acción */}
            <PrimaryButton
                children={"Subir Nuevo Examen"}
                className="mt-4 w-full flex justify-center items-center"
                onClick={handleNuevoExamen}
            />

            {/* Contenido condicional */}
            {examenes ? (
                examenes.length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <h2 className="bg-gray-100 px-4 py-3 font-semibold">
                            Tus exámenes ({examenes.length})
                        </h2>
                        <ul className="divide-y divide-gray-200">
                            {examenes.map((examen) => (
                                <li key={examen.id} className="p-4 hover:bg-gray-50">
                                    <div>
                                        <h3 className="font-medium">{examen.nombre}</h3>
                                        <p className="text-sm text-gray-500">
                                            {examen.asignatura} • {examen.preguntas} preguntas
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <p className="text-gray-500">No hay exámenes registrados</p>
                    </div>
                )
            ) : (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <p className="text-red-500">Error: No se recibieron datos de exámenes</p>
                </div>
            )}
        </div>
        </AuthenticatedLayout>
    );
}