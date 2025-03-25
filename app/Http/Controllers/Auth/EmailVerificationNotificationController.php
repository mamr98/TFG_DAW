<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }

    public function __invoke(Request $request)
{
    if (!$request->user()) {
        // Si no hay usuario autenticado (común en Railway)
        $user = User::find($request->route('id'));
        auth()->login($user); // Autentica al usuario manualmente
    }

    $request->user()->forceFill([
        'email_verified_at' => now()
    ])->save();

    return redirect()->to(
        config('app.frontend_url').'/dashboard?verified=1'
    );
}
}
