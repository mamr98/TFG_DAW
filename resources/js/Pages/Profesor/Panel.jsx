import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import ModalFormulario from '@/Components/hooks/ModalFormulario';

export default function PanelProfesor() {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mostrar notificaciones flash
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Obtener exámenes del profesor
    useEffect(() => {
        fetch('examenesProfesor')
            .then((response) => response.json())
            .then((data) => {
                setExamenes(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los exámenes:", error);
                setLoading(false);
            });
    }, []);

    // Confirmación para abrir formulario
    const handleNuevoExamen = () => {
        Swal.fire({
            title: '¿Subir nuevo examen?',
            text: 'Se abrirá el formulario para crear un nuevo examen',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                setShowForm(true);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Crear Examen
                </h2>
            }
        >
            <Head title="Crear Examen" />
            <ToastContainer />

            <div className="max-w-4xl mx-auto p-6">
                {showForm ? (
                    <ModalFormulario onClose={() => setShowForm(false)} />
                ) : (
                    <>
                        <PrimaryButton
                            onClick={handleNuevoExamen}
                            className="mt-4 w-full flex justify-center items-center"
                        >
                            Crear Examen
                        </PrimaryButton>

                        {/* Listado de exámenes */}
                        <div className="mt-8">
                            {loading ? (
                                <div className="text-center text-gray-500">Cargando exámenes...</div>
                            ) : examenes.length > 0 ? (
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <h2 className="bg-gray-100 px-4 py-3 font-semibold">
                                        Tus exámenes ({examenes.length})
                                    </h2>
                                    <ul className="divide-y divide-gray-200">
                                        {examenes.map((examen) => (
                                            <li key={examen.examen?.id} className="p-4 hover:bg-gray-50">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium">{examen.examen.nombre}</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {examen.asignatura?.nombre} • {examen.examen.preguntas} preguntas
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={`/storage/${examen.examen.archivo_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                                    >
                                                        Ver PDF
                                                    </a>
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            ) : (
                                <div className="bg-white p-6 rounded-lg shadow text-center mt-6">
                                    <p className="text-gray-500">No hay exámenes registrados</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
