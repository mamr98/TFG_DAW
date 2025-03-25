<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ComparacionController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/subir-imagen', function () {
    return Inertia::render('SubirImagenPage');
})->middleware(['auth', 'verified'])->name('subir-imagen');

Route::get('/notas', function () {
    return Inertia::render('NotasPage');
})->middleware(['auth', 'verified'])->name('notas');

Route::get('/gestionusuarios', function () {
    return Inertia::render('CreacionUsuarioPage');
})->middleware(['auth', 'verified'])->name('gestionusuarios');

// Rutas para la verificación de email
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

/* Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify'); */

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    // Verificar si el email ya está verificado
    if ($request->user()->hasVerifiedEmail()) {
        return redirect()->route('dashboard')->with('message', 'El email ya estaba verificado');
    }

    // Marcar como verificado
    $request->fulfill();

    // Redirigir con mensaje
    return redirect()->route('dashboard')->with([
        'message' => '¡Email verificado correctamente!',
        'verified' => true
    ]);
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /* Estas rutas no funciona pq los controladores aún hay que hacerlos */
    /* Route::post('/subir-imagen', [ExamenController::class, 'subirImagen'])->name('subirImagen');
    Route::post('/comparar-imagenes', [ComparacionController::class, 'comparar'])->name('comparar.imagenes'); */
});


/* Controlador UserContoller */
Route::middleware('auth', 'verified')->group(function () {
    /* Mostrar la lista de los usuarios */
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    /* Crear y Guardar un nuevo usuario */
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    /* Mostrar los detalles de un usuario */
    Route::get('/user', [UserController::class, 'show'])->name('users.show');
    /* Actualizar un usuario */
    Route::put('/users', [UserController::class, 'update'])->name('users.update');
    /* Eliminar un usuario */
    Route::delete('/users', [UserController::class, 'delete'])->name('users.delete');
});




require __DIR__.'/auth.php';
