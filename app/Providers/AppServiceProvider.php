<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configuración de HTTPS en producción
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
            $this->app['request']->server->set('HTTPS', 'on');
        }

        // Configuración de Vite
        Vite::prefetch(concurrency: 3);

        // Registro de los providers de autenticación personalizados
        $this->registerPolicies();

        Auth::provider('alumnos', function ($app, array $config) {
            return new EloquentUserProvider($app['hash'], $config['model']);
        });

        Auth::provider('profesores', function ($app, array $config) {
            return new EloquentUserProvider($app['hash'], $config['model']);
        });

        // Opcional: Configuración adicional de políticas si es necesario
        // $this->registerGates();
    }
}
