import { Head, Link } from "@inertiajs/react";
import informes from "../../assets/images/informes.png";
import tecnologia from "../../assets/images/examen_sincorregir.png";
import correcion from "../../assets/images/correcion.png";
import inicio from "../../assets/images/inicio.png";
import david from "../../assets/images/david.png";
import pablo from "../../assets/images/pablo.png";
import miguel from "../../assets/images/miguel.png";
export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* Navbar */}
                <nav className="bg-white shadow-sm w-full z-10 mt-4 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <Link
                                    href="/"
                                    className="flex-shrink-0 flex items-center"
                                >
                                    <svg
                                        className="h-8 w-auto text-blue-600"
                                        viewBox="0 0 62 65"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="ml-2 text-xl font-bold text-gray-800">
                                        Medac Lab
                                    </span>
                                </Link>
                            </div>
                            <div className="-mr-2 flex items-center">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 transition duration-300"
                                        >
                                            Iniciar sesión
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
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

                {/* Sobre nuestra web */}
                <section className=" mx-auto p-14 text-center bg-sky-700 rounded-sm my-8 text-white">
                    <h2 className="text-3xl font-semibold mb-4">
                        Plataforma de Corrección Automatizada
                    </h2>
                    <p className="mb-6 mx-auto max-w-6xl">
                        Nuestra solución utiliza inteligencia artificial para
                        comparar los exámenes de tus estudiantes con la
                        plantilla maestra, detectando automáticamente las
                        respuestas marcadas y calculando la puntuación final.
                        Elimina el tedioso proceso de corrección manual y reduce
                        los errores humanos.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link
                            href={route("register")}
                            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg border border-blue-600 transition duration-300"
                        >
                            Registrate ahora
                        </Link>
                    </div>
                </section>

                {/* Equipo */}
                <section className="bg-gray-100 p-8 m-5 mb-7">
                    <p className="text-black text-center mb-7 font-semibold text-3xl">
                        Creadores de la web
                    </p>
                    <div className="max-w-7xl mx-auto">
                        <div className=" text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* Footer */}
                <footer className="bg-[#001f3f] text-white py-4">
                    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {/* Primera columna: Enlaces */}
                        <div className="flex flex-col items-start justify-center text-left md:pl-24">
                            <a href="#" className="hover:text-gray-300">
                                Sobre nosotros
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                Política de privacidad
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                Términos y condiciones
                            </a>
                        </div>

                        {/* Segunda columna: Derechos reservados */}
                        <div className="flex flex-col items-center justify-center">
                            <p>
                                &copy; {new Date().getFullYear()} Medac. Todos
                                los derechos reservados.
                            </p>
                        </div>

                        {/* Tercera columna: Redes sociales */}
                        <div className="flex items-center justify-center space-x-4 md:pl-28">
                            <a
                                href="https://www.instagram.com/institutomedac/?hl=es"
                                target="_blank"
                                className="hover:text-gray-300"
                            >
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61572362099718"
                                target="_blank"
                                className="hover:text-gray-300"
                            >
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a
                                href="https://es.linkedin.com/school/davante-medac/"
                                target="_blank"
                                className="hover:text-gray-300"
                            >
                                <i className="fab fa-linkedin fa-lg"></i>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
