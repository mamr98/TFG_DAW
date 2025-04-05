import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './Context/AuthContext'; // Asegúrate de importar el AuthProvider
import { ToastContainer } from 'react-toastify';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
        [
            `./Pages/${name}.jsx`,
            `./Pages/Profesor/${name}.jsx`,
            `./Pages/Admin/${name}.jsx`,
            `./Pages/Alumno/${name}.jsx`,
        ],
        import.meta.glob('./Pages/**/*.jsx')
    ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Envuelve tu aplicación con el AuthProvider para que usePage funcione correctamente.
        root.render(
            <AuthProvider>
                <App {...props} />
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </AuthProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});