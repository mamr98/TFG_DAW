import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import informes from "../../assets/images/informes.webp";
import tecnologia from "../../assets/images/examen_sincorregir.webp";
import correcion from "../../assets/images/correcion.webp";
import inicio from "../../assets/images/inicio.webp";
import david from "../../assets/images/david.webp";
import pablo from "../../assets/images/pablo.webp";
import miguel from "../../assets/images/miguel.webp";
import marcos from "../../assets/images/marcos.webp";
import { Icon } from "@progress/kendo-react-common";
import { useEffect, useState } from "react";
export default function Welcome({ auth }) {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Efecto para detectar el scroll
    useEffect(() => {
        const handleScroll = () => {
            // Si el scroll es mayor a 100px, activa el sticky
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // 640px es el breakpoint sm de Tailwind
        };

        // Ejecutar al montar y al cambiar el tamaño
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const baseUrl = window.location.origin + (window.location.pathname.includes('TFG_DAW') ? '/TFG_DAW/public' : '');
    return (
        <>
            <Head title="Bienvenido" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* Navbar */}
                <nav className={`bg-gray-800 shadow-sm w-full z-50 transition-all duration-300 ${isSticky ? "fixed top-0" : "relative"}`}>
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
                            <div className="-mr-2 flex items-center">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-4 py-2 bg-sky-700 text-white font-medium hover:bg-blue-700 transition-transform duration-200 hover:scale-105"
                                    >
                                        Acceder App
                                    </Link>
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
                                                className="rounded-md px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium transition-transform duration-200 hover:scale-105"
                                            >
                                                Registrarse
                                            </Link>
                                        </div>

                                        {/* Versión móvil - botón hamburguesa */}
                                        {isMobile && (
                                            <div className="sm:hidden">
                                                <button
                                                    onClick={() =>
                                                        setIsOpen(!isOpen)
                                                    }
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
                        </div>

                        {/* Menú desplegable para móviles */}
                        {isMobile && isOpen && !auth.user && (
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
                                        className="block rounded-md px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-center transition-transform duration-200 hover:scale-105"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Header */}
                <header
                    className="relative w-full h-[460px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${inicio})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                        <h1 className="text-white text-5xl font-bold text-center">
                            Corrige exámenes en{" "}
                            <span className="text-emerald-500">segundos</span> con
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
                <section className="bg-gray-900 mx-auto px-4 py-12 rounded-sm">
                    <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-6">
                        <div
                            className="relative h-64 bg-cover bg-center flex flex-col justify-center items-center text-center text-white p-6 rounded-lg shadow-lg hover:transform hover:-translate-y-2 transition duration-300"
                            style={{ backgroundImage: `url(${correcion})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                            <h2 className="relative text-2xl font-bold">
                                Correcciones Instantáneas
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
                <section className="bg-[#34455d] text-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            ¿Cómo funciona?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-emerald-50 hover:bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-emerald-700 text-2xl font-bold">
                                        1
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Sube tu examen maestro
                                </h3>
                                <p className="text-white">
                                    Carga la plantilla con las respuestas
                                    correctas en formato imagen.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-emerald-50 hover:bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-emerald-700 text-2xl font-bold">
                                        2
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Sube tu examen a corregir
                                </h3>
                                <p className="text-white">
                                    Adjunta la imagen del examen
                                    completado por los estudiantes o deja que
                                    tus estudiantes lo suban por ellos mismos.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-emerald-50 hover:bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-emerald-700 text-2xl font-bold">
                                        3
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Obtén los resultados
                                </h3>
                                <p className="text-white">
                                    Recibe las correcciones automáticas de las
                                    puntuaciones al momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipo */}
                <section className="bg-gray-900 p-8 pb-12 pt-12">
                    <p className="text-white text-center mb-7 font-semibold text-3xl">
                        Creadores de la web
                    </p>
                    <div className="max-w-7xl mx-auto">
                        <div className=" text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-[#34455d] p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={pablo}
                                        alt="Pablo Gallego"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-emerald-50 text-2xl font-bold text-center">
                                    Pablo Gallego
                                </h3>
                                <p className="text-white text-center">
                                    FullStack Developer
                                </p>
                            </div>

                            <div className="bg-[#34455d] p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={miguel}
                                        alt="Miguel Ángel Milena"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-emerald-50 text-2xl font-bold text-center">
                                    Miguel Ángel Milena
                                </h3>
                                <p className="text-white text-center">
                                    FullStack Developer
                                </p>
                            </div>

                            <div className="bg-[#34455d] p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={david}
                                        alt="David Peláez"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-emerald-50 text-2xl font-bold text-center">
                                    David Peláez
                                </h3>
                                <p className="text-white text-center">
                                    FullStack Developer
                                </p>
                            </div>

                            <div className="bg-[#34455d] p-8 rounded-lg shadow-md hover:transform hover:-translate-y-2 transition duration-300">
                                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6">
                                    <img
                                        src={marcos}
                                        alt="Marcos García"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-emerald-50 text-2xl font-bold text-center">
                                    Marcos García
                                </h3>
                                <p className="text-white text-center">
                                    Mejoras en la web
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-4">
                    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {/* Primera columna: Enlaces */}
                        <div className="flex flex-col items-center md:items-start justify-center text-left md:pl-24">
                            <a href="#" className="hover:text-gray-300">
                                Politica de privacidad
                            </a>
                        </div>

                        {/* Segunda columna: Derechos reservados */}
                        <div className="flex flex-col items-center justify-center">
                            <p>
                                &copy; {new Date().getFullYear()} Medac. Todos los
                                derechos reservados.
                            </p>
                        </div>

                        {/* Tercera columna: Redes sociales */}
                        <div className="flex items-center justify-center space-x-4 md:pl-12 social-icons pr-2">
                            <a
                                href="https://www.instagram.com/institutomedac/?hl=es"
                                target="_blank"
                                className="hover:text-gray-300 icon instagram"
                            >
                                <i className="fab fa-instagram fa-lg k-icon"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61572362099718"
                                target="_blank"
                                className="hover:text-gray-300 icon facebook"
                            >
                                <Icon name="facebook" />
                            </a>
                            <a
                                href="https://es.linkedin.com/school/davante-medac/"
                                target="_blank"
                                className="hover:text-gray-300 icon linkedin"
                            >
                                <Icon name="linkedin" />
                            </a>
                        </div>
                    </div>
                    <style>{`
                    .social-icons .icon.instagram:before {
                        background-color: #E1306C;
                    }
                    .social-icons .icon.instagram .k-icon {
                        color: #E1306C;
                    }
                    .social-icons .icon,
                    .social-icons .icon:before,
                    .social-icons .icon .k-icon {
                    -webkit-transition: all 0.35s;
                    transition: all 0.35s;
                    -webkit-transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
                            transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
                    }
                    .social-icons .icon:before {
                    top: 90%;
                    left: -110%;
                    }
                    .social-icons .icon .k-icon {
                    -webkit-transform: scale(0.5);
                            transform: scale(0.5);
                    }
                    .social-icons .icon.facebook:before {
                    background-color: #3b5998;
                    }
                    .social-icons .icon.facebook .k-icon {
                    color: #3b5998;
                    }
                    .social-icons .icon.linkedin:before {
                    background-color: #0177b5;
                    }
                    .social-icons .icon.linkedin .k-icon {
                    color: #0177b5;
                    }
                    .social-icons .icon:focus:before,
                    .social-icons .icon:hover:before {
                    top: -10%;
                    left: -10%;
                    }
                    .social-icons .icon:focus .k-icon,
                    .social-icons .icon:hover .k-icon {
                    color: #fff;
                    -webkit-transform: scale(1);
                            transform: scale(1);
                    }
                    .social-icons .icon {
                    display: inline-block;
                    background-color: #fff;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    border-radius: 28%;
                    box-shadow: 0 5px 15px -5px rgba(0,0,0,0.1);
                    opacity: 0.99;
                    }
                    .social-icons .icon:before {
                    content: '';
                    width: 120%;
                    height: 120%;
                    position: absolute;
                    -webkit-transform: rotate(45deg);
                            transform: rotate(45deg);
                    }
                    .social-icons .icon .k-icon {
                    font-size: 31px;
                    vertical-align: middle;
                    }
                    .social-icons .icon .k-icon,
                    .social-icons .icon i.k-icon {
                    font-size: 31px;
                    display: inline-block;
                    vertical-align: middle;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    }



                `}</style>
                </footer>
            </div>
        </>
    );
}
