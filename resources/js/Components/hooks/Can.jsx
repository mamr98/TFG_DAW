import { usePage } from '@inertiajs/react';

export default function Can({ permission, permissions, children }) {
    const { auth } = usePage().props;
    const userPermissions = auth.user?.permissions || [];

    // Si se pasa un string (permiso único)
    if (permission) {
        if (userPermissions.includes(permission)) return children;
    }
    
    // Si se pasa un array (múltiples permisos)
    if (permissions) {
        if (permissions.some(p => userPermissions.includes(p))) return children;
    }

    return null;
}