import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import informes from "../../assets/images/informes.png";
import tecnologia from "../../assets/images/examen_sincorregir.png";
import correcion from "../../assets/images/correcion.png";
import inicio from "../../assets/images/inicio.png";
import david from "../../assets/images/david.png";
import pablo from "../../assets/images/pablo.png";
import miguel from "../../assets/images/miguel.png";
import Footer from "@/Components/hooks/Footer";
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
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
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-4 py-2 bg-sky-700 text-white font-medium hover:bg-blue-700 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-4 py-2 text-white font-medium hover:bg-gray-100 transition duration-300"
                                        >
                                            Iniciar sesión
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-4 py-2 bg-sky-700 text-white font-medium hover:bg-blue-700 transition duration-300"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <header
                    className="relative w-full h-[460px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${inicio})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                        <h1 className="text-white text-5xl font-bold">
                            Corrige exámenes en{" "}
                            <span className="text-blue-400">segundos</span> con
                            IA
                        </h1>
                        <div className="mt-4">
                            <p className="text-lg text-center font-bold text-white max-w-4xl">
                                Elimina el trabajo manual y obtén resultados
                                precisos al instante
                            </p>
                        </div>
                    </div>
                </header>

                {/*3 cosas importantes sobre el proyecto*/}
                <section className="bg-sky-700 mx-auto px-4 py-12 rounded-sm">
                    <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-6">
                        <div
                            className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-white p-6 rounded-lg shadow-lg hover:transform hover:-translate-y-2 transition duration-300"
                            style={{ backgroundImage: `url(${correcion})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <h2 className="relative text-2xl font-bold">
                                Corrección Instantánea
                            </h2>
                            <p className="relative mt-2 text-center">
                                Resultados en 30 segundos
                            </p>
                        </div>

                        <div
                            className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-white p-6 rounded-lg shadow-lg hover:transform hover:-translate-y-2 transition duration-300"
                            style={{
                                backgroundImage: `url(${tecnologia})`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <h2 className="relative text-2xl font-bold">
                                Tecnología IA
                            </h2>
                            <p className="relative mt-2 text-center">
                                Precisión del 99.8%
                            </p>
                        </div>

                        <div
                            className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-white p-6 rounded-lg shadow-lg hover:transform hover:-translate-y-2 transition duration-300"
                            style={{ backgroundImage: `url(${informes})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <h2 className="relative text-2xl font-bold">
                                Ahorra tiempo
                            </h2>
                            <p className="relative mt-2 text-center">
                                Reduce horas de trabajo
                            </p>
                        </div>
                    </div>
                </section>

                {/*Como funciona*/}
                <section className="bg-gray-100 text-black py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            ¿Cómo funciona?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 text-2xl font-bold">
                                        1
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Sube tu examen maestro
                                </h3>
                                <p className="text-gray-600">
                                    Carga la plantilla con las respuestas
                                    correctas en formato imagen.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 text-2xl font-bold">
                                        2
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Sube los exámenes a corregir
                                </h3>
                                <p className="text-gray-600">
                                    Adjunta las imágenes de los exámenes
                                    completados por los estudiantes o deja que
                                    tus estudiantes lo suban por ellos mismos.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-600 text-2xl font-bold">
                                        3
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Obtén los resultados
                                </h3>
                                <p className="text-gray-600">
                                    Recibe las correcciones automáticas de las
                                    puntuaciones al momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipo */}
                <section className="bg-sky-700 p-8 pb-12 pt-12">
                    <p className="text-black text-center mb-7 font-semibold text-3xl">
                        Creadores de la web
                    </p>
                    <div className="max-w-7xl mx-auto">
                        <div className=" text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={david}
                                        alt="David Peláez"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-center">
                                    David Peláez
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Desarrollador Frontend
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={pablo}
                                        alt="Pablo Gallego"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-center">
                                    Pablo Gallego
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Diseñador
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={miguel}
                                        alt="Miguel Ángel Milena"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-center">
                                    Miguel Ángel Milena
                                </h3>
                                <p className="text-gray-600 text-center">
                                    Desarrollador Backend
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer/>
            </div>
        </>
    );
}
