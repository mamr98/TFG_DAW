import { useState } from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function SubirExamenAlumno({ examenes }) {
    const { flash, nota } = usePage().props;
    const [examenId, setExamenId] = useState(examenes[0]?.id || '');
    const [imagen, setImagen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('examen_id', examenId);
        formData.append('imagen', imagen);

        router.post(route('alumno.examen.subir'), formData, {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Subir Examen Resuelto</h1>

            {nota && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
                    Tu nota: <strong>{nota}</strong>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Seleccionar Examen:
                    </label>
                    <select
                        value={examenId}
                        onChange={(e) => setExamenId(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        {examenes.map((examen) => (
                            <option key={examen.id} value={examen.id}>
                                {examen.nombre} (Subido el: {new Date(examen.created_at).toLocaleDateString()})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Imagen de tus Respuestas:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImagen(e.target.files[0])}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full p-2 bg-green-600 text-white rounded ${isLoading ? 'opacity-50' : 'hover:bg-green-700'}`}
                >
                    {isLoading ? 'Procesando...' : 'Enviar Examen'}
                </button>
            </form>
        </div>
    );
}