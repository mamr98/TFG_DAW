import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CrudUsuario from "@/Components/hooks/CrudUsuario";

export default function CreacionUsuarioPage() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Gestión de Usuarios
                </h2>
            }
        >
            <Head title="Gestión Usuarios" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <CrudUsuario/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}