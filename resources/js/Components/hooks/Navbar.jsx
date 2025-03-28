import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
export default function Navbar() {
    const { url } = usePage();
    const isDevelopment = url.includes('/TFG_DAW/public');
    const normalizedPath = isDevelopment 
    ? url.replace('/TFG_DAW/public', '') 
    : url;
    console.log("La url es:" + url);
    return (
        <>
            {/* Navbar */}
            <nav className="bg-gray-800 shadow-sm w-full z-10 pt-4 pb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex-shrink-0 flex items-center"
                            >
                                <ApplicationLogo className="h-8 w-auto text-blue-600" />
                                <span className="ml-2 text-xl font-bold text-gray-800">
                                    QuickMark
                                </span>
                            </Link>
                        </div>
                        <div className="-mr-2 flex items-center">
                            <div className="-mr-2 flex items-center">
                                {normalizedPath === "/login" ? (
                                    <Link
                                        href={route("register")}
                                        className="rounded-md mx-4 px-4 py-2 bg-sky-700 text-white font-medium hover:bg-blue-700 transition duration-300 sm:mx-0"
                                    >
                                        Registrarse
                                    </Link>
                                ) : normalizedPath === "/register" ? (
                                    <Link
                                        href={route("login")}
                                        className="rounded-md mx-4 px-4 py-2 bg-sky-700 text-white font-medium hover:bg-blue-700 transition duration-300 sm:mx-0"
                                    >
                                        Iniciar sesión
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
