<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class VerifyEmailController extends Controller
{
    public function __invoke(Request $request)
    {
        // 1. Verificación manual para evitar problemas con middlewares
        if (!URL::hasValidSignature($request)) {
            return redirect()->route('login')->with('error', 'Enlace inválido o expirado');
        }

        // 2. Obtener usuario directamente
        $user = $request->user() ?? User::find($request->route('id'));

        // 3. Verificación del hash manual
        if (!hash_equals(
            sha1($user->email),
            (string) $request->route('hash')
        )) {
            abort(403, 'Firma de verificación inválida');
        }

        // 4. Marcar como verificado
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new \Illuminate\Auth\Events\Verified($user));
        }

        // 5. Redirección segura
        return redirect(config('app.frontend_url').'/dashboard?verified=1');
    }
}