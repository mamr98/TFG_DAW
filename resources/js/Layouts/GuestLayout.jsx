import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    //Comprobar si esta en desarrollo o en local
    const baseUrl =
        window.location.origin +
        (window.location.pathname.includes("TFG_DAW") ? "/TFG_DAW/public" : "");
    return (
        <div className="flex min-h-[70vh] flex-col items-center bg-gray-100 pt-8 pb-10 sm:min-h-[calc(100vh-148px)] sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div>
                <Link href={`${baseUrl}/`}>
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
