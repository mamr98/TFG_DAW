<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!auth()->check()) {
            return redirect('/login');
        }

        $user = auth()->user();

    // Aquí debes implementar tu lógica de roles
    // Ejemplo básico (ajusta según tu sistema):
        if (!in_array($user->role, $roles)) {
            abort(403, 'No tienes permiso para acceder a esta página');
        }

        return $next($request);
    }
}
