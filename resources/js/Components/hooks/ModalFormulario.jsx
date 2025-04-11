import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function ModalFormulario({ onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre_examen: "",
        fecha_inicio: "",
        fecha_fin: "",
        asignatura_id: "",
        clase_id: "",
        fichero_profesor: null,
    });

    
    const [preview, setPreview] = useState(null);
    const [asignaturas, setAsignaturas] = useState([]);
    const [clases, setClases] = useState([]);
    const [loading, setLoading] = useState({
        asignaturas: true,
        clases: true,
    });

    // Cargar asignaturas y clases al abrir el modal
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Cargar asignaturas
                const asignaturasResponse = await fetch("asignaturas");
                const asignaturasData = await asignaturasResponse.json();
                setAsignaturas(asignaturasData);
                setLoading((prev) => ({ ...prev, asignaturas: false }));

                // Cargar clases
                const clasesResponse = await fetch("clases");
                const clasesData = await clasesResponse.json();
                setClases(clasesData);
                setLoading((prev) => ({ ...prev, clases: false }));
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setLoading({ asignaturas: false, clases: false });
            }
        };
        fetchData();
    }, []);

    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('fichero_profesor', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("profesor.examen.store"), {
            onSuccess: () => onClose(),
            preserveScroll: true,
        });
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Nuevo Examen
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {/* Campo Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Examen *
                        </label>
                        <input
                            type="text"
                            value={data.nombre_examen}
                            onChange={(e) => setData("nombre_examen", e.target.value)}
                            className={`w-full px-4 py-2 border rounded-md ${errors.nombre
                                    ? "border-red-500"
                                    : "focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            required
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* Campo Fecha Inicio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha y Hora de Inicio *
                        </label>
                        <input
                            type="datetime-local"
                            value={data.fecha_inicio}
                            onChange={(e) =>
                                setData("fecha_inicio", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-md ${errors.fecha_inicio
                                    ? "border-red-500"
                                    : "focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            required
                        />
                        {errors.fecha_inicio && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fecha_inicio}
                            </p>
                        )}
                    </div>

                    {/* Campo Fecha Fin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha y Hora de Finalización *
                        </label>
                        <input
                            type="datetime-local"
                            value={data.fecha_fin}
                            onChange={(e) =>
                                setData("fecha_fin", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-md ${errors.fecha_fin
                                    ? "border-red-500"
                                    : "focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            required
                        />
                        {errors.fecha_fin && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fecha_fin}
                            </p>
                        )}
                    </div>

                    {/* Select Asignatura */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Asignatura *
                        </label>
                        <select
                            value={data.asignatura_id}
                            onChange={(e) =>
                                setData("asignatura_id", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-md ${errors.asignatura_id
                                    ? "border-red-500"
                                    : "focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            required
                            disabled={loading.asignaturas}
                        >
                            <option value="">
                                {loading.asignaturas
                                    ? "Cargando asignaturas..."
                                    : "Seleccione una asignatura"}
                            </option>
                            {asignaturas.map((asignatura) => (
                                <option
                                    key={asignatura.id}
                                    value={asignatura.id}
                                >
                                    {asignatura.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.asignatura_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.asignatura_id}
                            </p>
                        )}
                    </div>

                    {/* Select Clase */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Clase *
                        </label>
                        <select
                            value={data.clase_id}
                            onChange={(e) =>
                                setData("clase_id", e.target.value)
                            }
                            className={`w-full px-4 py-2 border rounded-md ${errors.clase_id
                                    ? "border-red-500"
                                    : "focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            required
                            disabled={loading.clases}
                        >
                            <option value="">
                                {loading.clases
                                    ? "Cargando clases..."
                                    : "Seleccione una clase"}
                            </option>
                            {clases.map((clase) => (
                                <option key={clase.id} value={clase.id}>
                                    {clase.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.clase_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.clase_id}
                            </p>
                        )}
                    </div>

                    {/* Campo Archivo PDF */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Archivo PDF *
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className={`w-full px-4 py-2 border rounded-md ${errors.fichero_profesor ? 'border-red-500' : ''}`}
                            accept=".jpg, .jpeg, .png"
                            required
                        />
                        {errors.fichero_profesor && <p className="text-red-500 text-sm mt-1">{errors.fichero_profesor}</p>}

                        {/* Vista previa del PDF */}
                        {preview && (
                            <div className="mt-4 border rounded-md p-2">
                                <embed 
                                    src={preview} 
                                    type="application/pdf" 
                                    width="100%" 
                                    height="300px"
                                />
                                <p className="text-sm text-gray-500 mt-2">Vista previa del fichero_profesor</p>
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
                        disabled={
                            processing || loading.asignaturas || loading.clases
                        }
                    >
                        {processing ? "Guardando..." : "Guardar Examen"}
                    </button>
                </div>
            </form>
        </div>
    );
}
