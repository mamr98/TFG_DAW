import { Link } from "@inertiajs/react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <h1 className="text-9xl font-bold text-red-500">404</h1>
            <p className="text-4xl text-gray-700 mt-4 font-bold">Error 404! Not Found</p>
            <br />
            {/* Imagen del meme "This is fine" */}
            <div className="mb-8 max-w-md">
                <img
                    src="https://media3.giphy.com/media/9M5jK4GXmD5o1irGrF/giphy.gif?cid=6c09b952pmf514sswqlf0rai73m6xr33vjtrid7s0oqzabh8&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="This is fine meme"
                    className="rounded-lg shadow-lg"
                />
            </div>

            <p className="text-gray-500 mt-2 mb-8 text-xl">
                Esta página no existe.
            </p>

            {/* Botón secundario */}
            <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-red-500 text-white rounded-lg mt-4 text-gray-600 hover:bg-red-600 text-lg"
            >
                Volver atrás
            </button>
        </div>
    );
};

export default NotFound;