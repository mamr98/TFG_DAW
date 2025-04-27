import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatsDashboard from "@/Components/hooks/StatsDashboard";
import Can from "../Components/hooks/Can";
import { useAuth } from "../Context/AuthContext";
import ToastNotifier from "@/Components/hooks/ToastNotifier";

export default function Dashboard({ stats, chartData }) {
    const { user } = useAuth(); // Accede al usuario

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Inicio
                </h2>
            }
        >
            <Head title="Inicio" />
            <ToastNotifier />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <StatsDashboard stats={stats} />

                            {/* Sección adicional */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative bg-green-50 p-6 rounded-lg">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-lg" />
                                    <h3 className="text-lg font-semibold text-green-800 mt-2">
                                        Listado de permisos
                                    </h3>
                                    <Can permission="permisoadmin">
                                        <p className="text-lg text-green-800">
                                            Búsqueda-CRUD de Usuarios
                                        </p>
                                    </Can>
                                    <Can permission="permisoprofesor">
                                        <p className="text-lg text-green-800">
                                            Crud de exámenes, visualización
                                            nota alumnado, listado de alumnos y exportación de resultados a Excel
                                        </p>
                                    </Can>
                                    <Can permission="sinpermiso">
                                        <p className="text-lg text-green-800">
                                            Subir exámen y visualizar dicha nota
                                        </p>
                                    </Can>
                                </div>

                                <div className="relative bg-green-50 p-6 rounded-lg">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-lg" />
                                    <h3 className="text-lg font-semibold text-green-800 mt-2">
                                        Permisos de cuenta
                                    </h3>
                                    <Can permission="permisoadmin">
                                        <p className="text-green-800">
                                            Has entrado con un usuario que tiene
                                            el rol Admin
                                        </p>
                                    </Can>
                                    <Can permission="permisoprofesor">
                                        <p className="text-green-800">
                                            Has entrado con un usuario que tiene
                                            el rol Profesor
                                        </p>
                                    </Can>
                                    <Can permission="sinpermiso">
                                        <p className="text-green-800">
                                            Has entrado con un usuario que tiene
                                            el rol Alumno.
                                        </p>
                                    </Can>
                                </div>
                            </div>

                            {/* 📊 Gráfico circular de distribución de roles */}
                            {/* <div className="mt-12">
                                <Grafico chartData={chartData} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
