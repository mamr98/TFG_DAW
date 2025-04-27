import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    //Comprobar si esta en desarrollo o en local
    const baseUrl =
        window.location.origin +
        (window.location.pathname.includes("TFG_DAW") ? "/TFG_DAW/public" : "");
    return (
        <div className="flex flex-col items-center bg-gray-100 pt-4 pb-10 min-h-screen justify-center md:pb-8 sm:pt-0 dark:bg-gray-900">
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
