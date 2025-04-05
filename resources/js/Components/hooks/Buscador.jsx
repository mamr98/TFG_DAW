import React, { useEffect } from "react";

export function Buscador({ tipoUsuario, nombreBusqueda, setNombreBusqueda, onResultados }) {
    useEffect(() => {
        const fetchUsuarios = async () => {
            if (nombreBusqueda.length > 0) {
                try {
                    let endpoint = "";
                    switch (tipoUsuario) {
                        case "alumno":
                            endpoint = `alumno/buscador/${nombreBusqueda}`;
                            break;
                        case "profesor":
                            endpoint = `profesor/buscador/${nombreBusqueda}`;
                            break;
                        case "admin":
                            endpoint = `admin/buscador/${nombreBusqueda}`;
                            break;
                        default:
                            endpoint = `admin/buscador/${nombreBusqueda}`;
                    }

                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error("Error en la búsqueda");
                    
                    const data = await response.json();
                    onResultados(data);
                } catch (error) {
                    console.error("Error:", error);
                    onResultados([]);
                }
            } else {
                onResultados([]);
            }
        };

        const debounceTimer = setTimeout(fetchUsuarios, 300);
        return () => clearTimeout(debounceTimer);
    }, [nombreBusqueda, tipoUsuario, onResultados]);

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
                <span className="absolute right-4 top-3 text-gray-400">
                    <i className="bi bi-search text-xl"></i>
                </span>
            </div>
        </div>
    );
}

export default Buscador;