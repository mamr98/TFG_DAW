import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

export default function ToastNotifier() {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const toastType = searchParams.get('toast_type');
        const toastMessage = searchParams.get('toast_message');
        const toastDuration = searchParams.get('toast_duration');

        if (toastMessage) {
            toast[toastType || 'error'](toastMessage, {
                autoClose: parseInt(toastDuration, 10) || 5000,
                onClose: () => {
                    router.get(route('dashboard'), {}, {
                        preserveState: true,
                        replace: true
                    });
                }
            });
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    return null;
}