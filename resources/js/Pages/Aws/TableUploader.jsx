import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TableUploader() {
    const [result, setResult] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        file: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/process-table', {
            onSuccess: (res) => setResult(res.props.data),
            preserveScroll: true,
            forceFormData: true
        });
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    onChange={(e) => setData('file', e.target.files[0])}
                    className="mb-4"
                    accept=".png,.jpg,.jpeg,.pdf"
                />
                <button 
                    type="submit" 
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {processing ? 'Procesando...' : 'Procesar Tabla'}
                </button>
            </form>

            {result && (
                <div className="mt-8">
                    <h3 className="text-lg font-bold mb-4">Resultado:</h3>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto">
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}