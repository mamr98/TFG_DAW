<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComparacionController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::fallback(function(){
    return Inertia::render('Errors/404');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* AUTHENTICATED LAYOUT */
Route::get('/dashboard', function () {return Inertia::render('Dashboard');})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/subir-imagen', function () {return Inertia::render('SubirImagenPage');})->middleware(['auth', 'verified'])->name('subir-imagen');
Route::get('/notas', function () {return Inertia::render('NotasPage');})->middleware(['auth', 'verified'])->name('notas');
Route::get('/gestionusuarios', function () {return Inertia::render('CreacionUsuarioPage');})->middleware(['auth', 'verified'])->name('gestionusuarios');
Route::get('/panelprofesor', function(){return Inertia::render('Panel');})->middleware(['auth', 'verified'])->name('panelprofesor');

/* VERIFICACION EMAIL */
Route::get('/email/verify', function () {return Inertia::render('Auth/VerifyEmail');})->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();
//     return redirect('/dashboard');
// })->middleware(['auth', 'signed'])->name('verification.verify');
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed']) // <-- Asegúrate que esté presente
    ->name('verification.verify');

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

/*
                USUARIOS
*/
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

/* Controlador UserContoller */
Route::middleware('auth', 'verified')->group(function () {
    /* Mostrar la lista de los usuarios */
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    /* Crear y Guardar un nuevo usuario */
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    /* Mostrar los detalles de un usuario */
    Route::get('/users', [UserController::class, 'show'])->name('users.show');
    /* Actualizar un usuario */
    Route::put('/users', [UserController::class, 'update'])->name('users.update');
    /* Eliminar un usuario */
    Route::delete('/users', [UserController::class, 'delete'])->name('users.delete');
});
Route::get('/usuario', [UserController::class, 'index'])->name('users.index');
Route::post('/usuario', [UserController::class, 'create'])->name('users.create');



require __DIR__.'/auth.php';
