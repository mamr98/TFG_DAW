<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Transform403To404
{
    public function handle($request, Closure $next)
    {
        try {
            $response = $next($request);

            if ($response->status() === 403) {
                // Usa Inertia::location para forzar el envío de props
                return Inertia::location(route('dashboard', [
                    'toast' => [
                        'type' => 'error',
                        'message' => 'No tienes permisos para acceder',
                        'duration' => 5000
                    ]
                ]));
            }

            return $response;
        } catch (AuthorizationException $e) {
            return Inertia::render('Dashboard', [
                'toast' => [
                    'type' => 'error',
                    'message' => 'No tienes permisos para acceder',
                    'duration' => 5000
                ]
            ]);
        }
    }
}
