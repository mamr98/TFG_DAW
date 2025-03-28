import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function PanelProfesor() {
    const { examenes } = usePage().props;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Panel del Profesor</h1>

            <div className="mb-6">
                <Link
                    href={route('profesor.examen')}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Subir nuevo examen
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <h2 className="bg-gray-100 px-4 py-3 font-semibold">Tus exámenes subidos</h2>

                {examenes.length === 0 ? (
                    <p className="p-4 text-gray-500">Aún no has subido ningún examen</p>
                ) : (
                    <ul className="divide-y">
                        {examenes.map(examen => (
                            <li key={examen.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{examen.nombre}</p>
                                        <p className="text-sm text-gray-500">
                                            Subido: {new Date(examen.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                        {examen.respuestas_maestras?.length || 0} respuestas
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}