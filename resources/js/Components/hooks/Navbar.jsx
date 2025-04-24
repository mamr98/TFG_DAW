import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { url, component } = usePage();//404
    //comprobar localizacion de la ruta para saber que mostar en navbar
    const isDevelopment = url.includes("/TFG_DAW/public");
    const normalizedPath = isDevelopment
        ? url.replace("/TFG_DAW/public", "")
        : url;
    //Comprobar si esta en desarrollo o en local
    const baseUrl =
        window.location.origin +
        (window.location.pathname.includes("TFG_DAW") ? "/TFG_DAW/public" : "");
    
    //Menu movil
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); 
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Verificar página 404
    const is404Page = component === 'Errors/404';

    return (
        <nav className="bg-gray-800 shadow-sm w-full z-10 pt-4 pb-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href={`${baseUrl}/`}
                            className="flex-shrink-0 flex items-center"
                        >
                            <ApplicationLogo className="h-8 w-auto text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-white">
                                QuickMark
                            </span>
                        </Link>
                    </div>
                    
                    {/* Lógica Mostrar botones */}
                    {!is404Page && (
                        <div className="-mr-2 flex items-center">
                            {normalizedPath === "/login" ? (
                                <Link
                                    href={route("register")}
                                    className="rounded-md mx-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium transition duration-300 sm:mx-0"
                                >
                                    Registrarse
                                </Link>
                            ) : normalizedPath === "/register" ? (
                                <Link
                                    href={route("login")}
                                    className="rounded-md mx-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium transition duration-300 sm:mx-0"
                                >
                                    Iniciar sesión
                                </Link>
                            ) : normalizedPath === "/confirm-password" ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md mx-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium transition duration-300 sm:mx-0"
                                >
                                    Acceder App
                                </Link>
                            ) : normalizedPath === "/verify-email" ? (
                                null
                            ) : (
                                <>
                                    {/* Versión desktop*/}
                                    <div className="hidden sm:flex space-x-4">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-white font-medium hover:bg-gray-700 transition duration-300"
                                        >
                                            Iniciar sesión
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 bg-emerald-500 dark:bg-emerald-600 text-white font-medium"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>

                                    {/* Versión móvil - botón hamburguesa */}
                                    {isMobile && (
                                        <div className="sm:hidden">
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="inline-flex items-center justify-center px-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                                aria-expanded="false"
                                            >
                                                {isOpen ? (
                                                    <i className="fas fa-times text-xl"></i>
                                                ) : (
                                                    <i className="fas fa-bars text-xl"></i>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Menú móvil - solo si no es página 404 */}
                {!is404Page && isMobile && isOpen && (
                    <div className="sm:hidden pb-4">
                        <div className="flex flex-col space-y-2 px-2 pt-2">
                            <Link
                                href={route("login")}
                                className="block rounded-md px-3 py-2 text-white font-medium hover:bg-gray-700 transition duration-300 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                href={route("register")}
                                className="block rounded-md px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}