import Footer from '@/Components/hooks/Footer';
import Navbar from '@/Components/hooks/Navbar';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
        <Navbar/>
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-003049">
                ¡Gracias por registrarte! Antes de empezar, por favor verifica tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar. Si no recibiste el correo, te enviaremos otro con gusto.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-669bbc">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing} className="bg-669bbc hover:bg-003049 text-white">
                        {processing ? 'Reenviando...' : 'Reenviar correo de verificación'}
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-780000 underline hover:text-C1121F focus:outline-none focus:ring-2 focus:ring-669bbc focus:ring-offset-2"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
        <Footer/>
        </>
    );
}
