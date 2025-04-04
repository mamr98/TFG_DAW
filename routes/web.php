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
Route::get('/panelprofesor', function(){return Inertia::render('Panel');})->middleware(['auth', 'verified', "role:admin|profesor"])->name('panelprofesor');

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

//rutas para admin
Route::middleware('auth', 'verified', "role:admin")->group(function () {

    //CRUD Admin
    Route::get('/admin', [UserController::class, 'index'])->name('admin.index');
    Route::get('/admin', [UserController::class, 'edit'])->name('admin.edit');
    Route::post('/admin', [UserController::class, 'createAdmin'])->name('admin.create');
    Route::patch('/admin', [UserController::class, 'update'])->name('admin.update');
    Route::delete('/admin', [UserController::class, 'destroy'])->name('admin.destroy');

    //CRUD Profesor
    Route::get('/admin/profesor', [UserController::class, 'index'])->name('admin.indexProfesor');
    Route::get('/admin/profesor', [UserController::class, 'edit'])->name('admin.editProfesor');
    Route::post('/admin/profesor', [UserController::class, 'createProfesor'])->name('admin.createProfesor');
    Route::patch('/admin/profesor', [UserController::class, 'update'])->name('admin.updateProfesor');
    Route::delete('/admin/profesor', [UserController::class, 'destroy'])->name('admin.destroyProfesor');

    //CRUD Alumno
    Route::get('/admin/alumno', [UserController::class, 'index'])->name('admin.indexAlumno');
    Route::get('/admin/alumno', [UserController::class, 'edit'])->name('admin.editAlumno');
    Route::post('/admin/alumno', [UserController::class, 'createAlumno'])->name('admin.createAlumno');
    Route::patch('/admin/alumno', [UserController::class, 'update'])->name('admin.updateAlumno');
    Route::delete('/admin/alumno', [UserController::class, 'destroy'])->name('admin.destroyAlumno');
});

//rutas para profesor
Route::middleware('auth', 'verified', "role:profesor")->group(function () {
   //CRUD Profesor
   Route::get('/profesor', [UserController::class, 'index'])->name('profesor.indexProfesor');
   Route::get('/profesor', [UserController::class, 'edit'])->name('profesor.editProfesor');
   Route::post('/profesor', [UserController::class, 'createProfesor'])->name('profesor.createProfesor');
   Route::patch('/profesor', [UserController::class, 'update'])->name('profesor.updateProfesor');
   Route::delete('/profesor', [UserController::class, 'destroy'])->name('profesor.destroyProfesor');
   
   //CRUD Alumno
   Route::get('/profesor/alumno', [UserController::class, 'index'])->name('profesor.indexAlumno');
   Route::get('/profesor/alumno', [UserController::class, 'edit'])->name('profesor.editAlumno');
   Route::post('/profesor/alumno', [UserController::class, 'createAlumno'])->name('profesor.createAlumno');
   Route::patch('/profesor/alumno', [UserController::class, 'update'])->name('profesor.updateAlumno');
   Route::delete('/profesor/alumno', [UserController::class, 'destroy'])->name('profesor.destroyAlumno');
   
});

require __DIR__.'/auth.php';
