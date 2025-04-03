import { useAuth } from "../../Context/AuthContext";

const Can = ({ permission, children }) => {
    const { user } = useAuth(); // Obtén el usuario del contexto

    if (!user || !user.permissions) return null; // Si no hay usuario o permisos, no mostramos nada

    // Verificar si el usuario tiene el permiso requerido
    if (user.permissions.includes(permission)) {
        return children;
    }

    return null;
};

export default Can;
