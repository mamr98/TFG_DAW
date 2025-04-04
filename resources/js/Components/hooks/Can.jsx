import { usePage } from '@inertiajs/react';

export default function Can({ permission, children }) {
    const { auth } = usePage().props;
    const hasPermission = auth.user?.permissions?.includes(permission);

    return hasPermission ? children : null;
}