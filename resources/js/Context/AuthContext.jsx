import { createContext, useContext } from "react";
import { usePage } from "@inertiajs/react"; // Importar el hook de Inertia

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { auth } = usePage(); // Usamos usePage dentro de un componente Inertia.

    return (
        <AuthContext.Provider value={{ user: auth?.user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
