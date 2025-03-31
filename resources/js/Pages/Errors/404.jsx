import Footer from "@/Components/hooks/Footer";
import Navbar from "@/Components/hooks/Navbar";
import { Link } from "@inertiajs/react";
import Gif from "../../../assets/images/This_Is_Fine.gif";
const NotFound = () => {
    return (
        <>
        <Navbar/>
        <div className="min-h-[70vh] flex flex-col items-center justify-center sm:min-h-[79.8vh] bg-gray-900 p-4 text-center">
            <h1 className="text-7xl font-bold text-red-500">404</h1>
            <p className="text-4xl text-gray-100 mt-4 font-bold">Error 404! Not Found</p>
            <br />
            {/* Gif "This is fine" */}
            <div className="mb-8 max-w-md">
                <img
                    src={Gif}
                    alt="This is fine meme"
                    className="rounded-lg shadow-lg"
                />
            </div>

            <p className="text-gray-300 mt-2 mb-8 text-xl">
                Esta página no existe.
            </p>

            {/* Botón secundario */}
            <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-red-500 rounded-lg mt-2 text-white hover:bg-red-600 text-lg"
            >
                Volver atrás
            </button>
        </div>
        <Footer/>
        </>
    );
};

export default NotFound;