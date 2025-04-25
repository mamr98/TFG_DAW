import { Icon } from "@progress/kendo-react-common";
export default function Footer() {
    return (
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
                            &copy; {new Date().getFullYear()} Medac. Todos los
                            derechos reservados.
                        </p>
                    </div>

                    {/* Tercera columna: Redes sociales */}
                    <div className="flex items-center justify-center space-x-4 md:pl-28 social-icons">
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
        </>
    );
}
