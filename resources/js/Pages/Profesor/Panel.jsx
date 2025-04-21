import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalFormulario from "@/Components/hooks/ModalFormulario";
import ExamenCard from "./ExamenCard";
import PaginationControls from "./PaginationControls";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import EditExamenForm from "./EditExamenForm";
import Buscador from "@/Components/hooks/Buscador";

export default function PanelProfesor() {
    const { flash, auth } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [examenes, setExamenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isReloading, setIsReloading] = useState(false);
    const [editingExamen, setEditingExamen] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [asignaturas, setAsignaturas] = useState([]);
    const [clases, setClases] = useState([]);
    const [loadingResources, setLoadingResources] = useState(false);

    const [buscadorTipoUsuario] = useState("examen");
    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);
    

    // Función para manejar el clic en editar examen
    const handleEditClick = (examen) => {
        setLoadingResources(true);

        // Cargar asignaturas y clases del profesor antes de abrir el modal
        Promise.all([
            fetch(route("asignaturas")).then((res) => res.json()),
            fetch(route("clases")).then((res) => res.json()),
        ])
            .then(([asignaturasData, clasesData]) => {
                setAsignaturas(asignaturasData);
                setClases(clasesData);
                setEditingExamen(examen);
                setShowEditForm(true);
            })
            .catch((error) => {
                console.error("Error cargando recursos:", error);
                toast.error("Error al cargar asignaturas y clases");
            })
            .finally(() => {
                setLoadingResources(false);
            });
    };

    // Función para cerrar el modal de edición
    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setEditingExamen(null);
    };

    // Función para manejar el éxito de la edición
    const handleEditSuccess = (updatedData) => {
        // Actualizar el estado local con los datos actualizados
        if (updatedData && updatedData.data && updatedData.data.examen) {
            const updatedExamen = updatedData.data.examen;
            const updatedAsignatura = updatedData.data.asignatura;

            setExamenes((prev) =>
                prev.map((item) =>
                    item.examen.id === updatedExamen.id
                        ? {
                            ...item,
                            examen: updatedExamen,
                            asignatura: updatedAsignatura,
                        }
                        : item
                )
            );
        }

        // Cerrar el formulario de edición
        setShowEditForm(false);
        setEditingExamen(null);

        // Mostrar notificación de éxito
        toast.success("Examen actualizado correctamente");
    };

    // Función corregida para eliminar un examen
    const handleDeleteExamen = (examenId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            // Añadido async aquí
            if (result.isConfirmed) {
                try {
                    router.delete(`profesor/examen/${examenId}`, {
                        onSuccess: () => {
                            setExamenes(prev => prev.filter(item => item.id !== examenId));
                            toast.success("Examen eliminado correctamente");
                        },
                        onError: (errors) => {
                            toast.error(errors.message || "Error al eliminar");
                        }
                    });
                } catch (error) {
                    console.error("Error:", error);
                    toast.error("Error de conexión al eliminar el examen");
                }
            }
        });
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Función para obtener exámenes
    const fetchExamenes = () => {
        setIsReloading(true);
        fetch("examenesProfesor")
            .then((response) => response.json())
            .then((data) => {
                const sortedData = data.sort(
                    (a, b) =>
                        new Date(b.examen.created_at) -
                        new Date(a.examen.created_at)
                );
                setExamenes(sortedData);
                setCurrentPage(1);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Error al cargar los exámenes");
            })
            .finally(() => {
                setLoading(false);
                setIsReloading(false);
            });
    };

    // Cargar exámenes al montar el componente
    useEffect(() => {
        fetchExamenes();
    }, []);

    // Función para abrir el formulario de nuevo examen
    const handleNuevoExamen = () => {
        Swal.fire({
            title: "¿Subir nuevo examen?",
            text: "Se abrirá el formulario para crear un nuevo examen",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                setShowForm(true);
            }
        });
    };

    // Función para obtener los exámenes paginados
    const paginatedExamenes = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return examenes.slice(startIndex, startIndex + itemsPerPage);
    };

   return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Panel de Exámenes
            </h2>
        }
    >
        <Head title="Panel de Exámenes" />
        <ToastContainer />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showForm ? (
                <ModalFormulario onClose={() => setShowForm(false)} />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Gestión de Exámenes
                        </h1>
                        <button
                            onClick={fetchExamenes}
                            disabled={isReloading}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${isReloading ? "animate-spin" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            {isReloading ? "Recargando..." : "Recargar"}
                        </button>
                    </div>

                    {/* Buscador siempre visible */}
                    <Buscador
                        tipoUsuario={buscadorTipoUsuario}
                        nombreBusqueda={nombreBusqueda}
                        setNombreBusqueda={setNombreBusqueda}
                        onResultados={setResultados}
                    />

                    {/* Resultados del Buscador */}
                    {nombreBusqueda && (
                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Resultados de búsqueda
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {resultados.length > 0 ? (
                                    resultados.map((examen) => (
                                        <ExamenCard
                                            key={examen.id}
                                            examen={examen}
                                            asignatura={examen.asignatura}
                                            onEditClick={handleEditClick}
                                            onDeleteClick={handleDeleteExamen}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-6">
                                        <p className="text-gray-500 dark:text-gray-300 text-lg">
                                            No se encontraron resultados 😞
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>

        {/* Modal de edición de examen */}
        {showEditForm && editingExamen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {loadingResources ? (
                        <div className="p-6 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                    ) : (
                        <EditExamenForm
                            examen={editingExamen}
                            onClose={handleCloseEditForm}
                            asignaturas={asignaturas || []}
                            clases={clases || []}
                            onSuccess={handleEditSuccess}
                        />
                    )}
                </div>
            </div>
        )}
    </AuthenticatedLayout>
);

    
}
