<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Aws\Textract\TextractClient;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotasController;
use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TextractController;
use App\Http\Controllers\Admin\UserContoller;
use App\Http\Controllers\AsignaturasController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ComparacionController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* AUTHENTICATED LAYOUT */
Route::get('/inicio', function () {return Inertia::render('Dashboard', ['toast' => request()->input('toast')]);})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/subir-imagen', function () {return Inertia::render('SubirImagenPage');})->middleware(['auth', 'verified', "role:alumno"])->name('subir-imagen');
Route::get('/gestionusuarios', function () {return Inertia::render('CreacionUsuarioPage');})->middleware(['auth', 'verified', "role:admin"])->name('gestionusuarios');
Route::get('/panelprofesor', function(){return Inertia::render('Profesor/Panel');})->middleware(['auth', 'verified', "role:admin|profesor"])->name('panelprofesor');



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
    Route::post('/admin', [UserController::class, 'createAdmin'])->name('admin.create');
    Route::put('/admin/{id}', [UserController::class, 'update'])->name('admin.update');
    Route::put('admin/estado/{id}', [UserController::class, 'estado'])->name('admin.estado');
    Route::get('admin/buscador/{nombre}', [UserController::class, 'buscarAdmin'])->name('admin.buscador');
    Route::get('admin/{id}', [UserController::class, 'show'])->name('admin.show');


    //CRUD Profesor
    Route::get('/admin/profesor', [UserController::class, 'index'])->name('admin.indexProfesor');
    Route::post('/admin/profesor', [UserController::class, 'createProfesor'])->name('admin.createProfesor');
    Route::put('/admin/profesor/{id}', [UserController::class, 'update'])->name('admin.updateProfesor');
    Route::put('admin/profesor/estado/{id}', [UserController::class, 'estado'])->name('admin.estadoProfesor');
    Route::get('profesor/buscador/{nombre}', [UserController::class, 'buscarProfesor'])->name('admin.buscadorProfesor');
    Route::get('profesor/{id}', [UserController::class, 'show'])->name('profesor.show');


    //CRUD Alumno
    Route::get('/admin/alumno', [UserController::class, 'index'])->name('admin.indexAlumno');
    Route::post('/admin/alumno', [UserController::class, 'createAlumno'])->name('admin.createAlumno');
    Route::put('/admin/alumno/{id}', [UserController::class, 'update'])->name('admin.updateAlumno');
    Route::put('admin/alumno/estado/{id}', [UserController::class, 'estado'])->name('admin.estadoAlumno');
    Route::get('alumno/buscador/{nombre}', [UserController::class, 'buscarAlumno'])->name('admin.buscadorAlumno');
    Route::get('alumno/{id}', [UserController::class, 'show'])->name('alumno.show');

    Route::get('/asignaturas', [ExamenController::class, 'recogerAsignaturas'])->name('asignaturas');
    Route::get('/clases', [ExamenController::class, 'recogerClases'])->name('clases_profesor');

    Route::get('/admin/dashboard', [UserController::class, 'Grafico'])->name('admin.dashboard');


});

//rutas para profesor
Route::middleware('auth', 'verified', "role:profesor")->group(function () {
    Route::get('/asignaturas', [ExamenController::class, 'recogerAsignaturas'])->name('asignaturas');
    Route::get('/clases', [ExamenController::class, 'recogerClases'])->name('clases');

    Route::get('/asignaturas/mostrar', [AsignaturasController::class, 'index'])->name('mostrarAsignaturas');
    Route::post('/asignaturas/crear', [AsignaturasController::class, 'create'])->name('asignaturas.create');
    Route::put('/asignaturas/modificar', [AsignaturasController::class, 'update'])->name('asignaturas.update');
    Route::delete('/asignaturas/eliminar', [AsignaturasController::class, 'destroy'])->name('asignaturas.destroy');

    Route::get('/examenesProfesor', [ExamenController::class, 'recogerExamenesProfesor'])->name('examenesProfesor');
    Route::post('/profesor/examen', [ExamenController::class, 'store'])->name('profesor.examen.store');
    Route::put('/profesor/examen/{id}', [ExamenController::class, 'actualizarExamen'])->name('profesor.examen.update');
    Route::delete('/profesor/examen/{id}', [ExamenController::class, 'deleteExamen'])->name('profesor.examen.destroy');

    Route::get('/alumnos/clase/{claseId}', [AlumnoController::class, 'index'])->name('alumnos.clase');
    Route::get('/api/alumnos/clase/{claseId}', [AlumnoController::class, 'getAlumnosPorClase']);
    Route::post('/alumnos/quitar', [AlumnoController::class, 'quitarDeClase']);

    
    Route::put('/alumnos/clase', [AlumnoController::class, 'update'])->name('alumnos.crud');

    Route::get('/alumnos/clases', [AlumnoController::class, 'obtenerClases']);

    Route::post('/alumnos/asignar', [AlumnoController::class, 'asignarClase'])->name('alumnos.asignar');

    Route::get('/alumnos/mostrar', [AlumnoController::class, 'mostrarTodosAlumnos'])->name('alumnos.mostrar');


});



Route::middleware('auth', 'verified', "role:alumno")->group(function () {
    Route::get('/examenesAlumno', [ExamenController::class, 'recogerExamenesAlumno'])->name('examenesAlumno');
    Route::post('/alumno/examen/{idExamen}', [ExamenController::class, 'crearExamenAlumno'])->name('examen.alumno');
});


//Tiene que estar al final
Route::fallback(function(){
    return Inertia::render('Errors/404');
});

Route::get('/notas', [NotasController::class, 'index'])->middleware(['auth', 'verified', "role:profesor|alumno"])->name('notas');


Route::get('/inicio', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware(['auth'])->get('/clases-profesor', [DashboardController::class, 'clasesAsignadas']);
Route::get('/examenes/total', [DashboardController::class, 'getTotalExamenes'])->middleware(['auth', 'verified'])->name('examenes.total');
Route::get('/examenes/profesor/total', [DashboardController::class, 'getTotalExamenesPorProfesor'])->middleware(['auth', 'verified'])->name('examenesprofesor.total');
Route::get('/examenes/alumno/total', [DashboardController::class, 'getTotalExamenesPorAlumno'])->middleware(['auth', 'verified'])->name('examenesalumno.total');
Route::get('/examenes/alumno/media', [DashboardController::class, 'getTotalMediaAlumno'])->middleware(['auth', 'verified'])->name('examenesalumno.media');
Route::get('/clase/alumno', [DashboardController::class, 'getClasesAlumno'])->middleware(['auth', 'verified'])->name('clase.alumno');


require __DIR__.'/auth.php';
