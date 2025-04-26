import Can from "@/Components/hooks/Can";
export default function EmptyState({ onCrearExamen }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <Can permissions={["permisoprofesor"]}>
                <p className="text-gray-500 dark:text-gray-400 mb-4">No hay registrado ningun examen</p>
                </Can>
                <Can permissions={["sinpermiso"]}>
                <p className="text-gray-500 dark:text-gray-400 mb-4">No tienes examenes pendientes</p>
                </Can>

                <Can permissions={["permisoprofesor"]}>
                <button
                    onClick={onCrearExamen}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Crear tu primer examen
                </button>
                </Can>
            </div>
        </div>
    );
}