import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ModalFormulario({ onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        asignatura: '',
        preguntas: '',
        archivo: null
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profesor.examen.store'), {
            onSuccess: () => onClose(),
            preserveScroll: true
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('archivo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Nuevo Examen</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* Campo Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Examen *
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                            required
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>

                    {/* Campo Asignatura */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Asignatura *
                        </label>
                        <input
                            type="text"
                            value={data.asignatura}
                            onChange={(e) => setData('asignatura', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md ${errors.asignatura ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                            required
                        />
                        {errors.asignatura && <p className="text-red-500 text-sm mt-1">{errors.asignatura}</p>}
                    </div>

                    {/* Campo Número de Preguntas */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Preguntas *
                        </label>
                        <input
                            type="number"
                            value={data.preguntas}
                            onChange={(e) => setData('preguntas', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md ${errors.preguntas ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                            min="1"
                            required
                        />
                        {errors.preguntas && <p className="text-red-500 text-sm mt-1">{errors.preguntas}</p>}
                    </div>

                    {/* Campo Archivo PDF */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Archivo PDF *
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={`w-full px-4 py-2 border rounded-md ${errors.archivo ? 'border-red-500' : ''}`}
                            accept=".pdf"
                            required
                        />
                        {errors.archivo && <p className="text-red-500 text-sm mt-1">{errors.archivo}</p>}
                        
                        {/* Vista previa del PDF */}
                        {preview && (
                            <div className="mt-4 border rounded-md p-2">
                                <embed 
                                    src={preview} 
                                    type="application/pdf" 
                                    width="100%" 
                                    height="300px"
                                />
                                <p className="text-sm text-gray-500 mt-2">Vista previa del archivo</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botones del formulario */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                        disabled={processing}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? 'Guardando...' : 'Guardar Examen'}
                    </button>
                </div>
            </form>
        </div>
    );
}