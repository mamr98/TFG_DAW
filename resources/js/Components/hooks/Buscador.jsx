import React, { useEffect, useCallback } from "react";

export function Buscador({ tipoUsuario, nombreBusqueda, setNombreBusqueda, onResultados }) {
    const fetchUsuarios = useCallback(async (searchTerm) => {
        try {
            let endpoint = "";
            switch (tipoUsuario) {
                case "alumno":
                    endpoint = `alumno/buscador/${searchTerm}`;
                    break;
                case "profesor":
                    endpoint = `profesor/buscador/${searchTerm}`;
                    break;
                case "admin":
                    endpoint = `admin/buscador/${searchTerm}`;
                    break;
                default:
                    endpoint = `admin/buscador/${searchTerm}`;
            }

            const response = await fetch(endpoint);
            if (!response.ok) throw new Error("Error en la búsqueda");

            const data = await response.json();
            onResultados(data);
        } catch (error) {
            console.error("Error:", error);
            onResultados([]);
        }
    }, [tipoUsuario, onResultados]);

    // Función para el botón de búsqueda manual
    const handleButtonSearch = () => {
        if (nombreBusqueda.length > 0) {
            fetchUsuarios(nombreBusqueda);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (nombreBusqueda.length > 0) {
                fetchUsuarios(nombreBusqueda);
            } else {
                onResultados([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [nombreBusqueda, fetchUsuarios, onResultados]);

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    style={{ color: '#000000' }}
                    className="w-full px-4 py-3 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={nombreBusqueda}
                    onChange={(e) => setNombreBusqueda(e.target.value)}
                />
                <span className="absolute right-4 top-3 flex items-center gap-2 text-gray-400">
                    <i className="bi bi-search text-sm"></i>
                    <button 
                        onClick={handleButtonSearch}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
                    >
                        <img
                            src="flecha.png"
                            alt="Flecha"
                            className="w-4 h-4 object-contain"
                        />
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Buscador;