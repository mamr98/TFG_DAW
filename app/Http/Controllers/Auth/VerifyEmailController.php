<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
{
    // Verificar si el usuario ya tiene el correo verificado
    if ($request->user()->hasVerifiedEmail()) {
        dd('El usuario ya tiene el correo verificado.'); // Aquí comprobamos si ya está verificado
        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }

    // Intentar marcar el correo como verificado
    if ($request->user()->markEmailAsVerified()) {
        // Log para verificar si el correo se ha marcado correctamente como verificado
        dd('Correo marcado como verificado para el usuario: ' . $request->user()->email);

        event(new Verified($request->user()));
    }

    // Redirigir al dashboard con el parámetro 'verified=1'
    return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
}
}
