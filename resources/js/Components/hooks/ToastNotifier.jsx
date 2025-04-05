import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePage, router } from '@inertiajs/react';

export default function ToastNotifier() {
    const { toast: toastData } = usePage().props;

    useEffect(() => {
        if (toastData) {
            toast[toastData.type || 'error'](toastData.message, {
                autoClose: toastData.duration || 5000,
                onClose: () => {
                    // Limpia el toast de la URL después de mostrarlo
                    router.get(route('dashboard'), {}, { 
                        preserveState: true,
                        replace: true 
                    });
                }
            });
        }
    }, [toastData]);

    return null;
}