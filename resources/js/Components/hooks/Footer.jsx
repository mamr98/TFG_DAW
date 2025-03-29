export default function Footer() {
    return(
        <>
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
        </>
    )
}