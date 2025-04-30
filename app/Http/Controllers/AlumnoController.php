<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    public function index($claseId){
        /* 
        *Almacenamos en la variable $alumnos los usuarios que tengan el rol alumno.
        *Para ello, además hacemos uso de la relación relacion_clase_alumno y las utilidades role y whereHas de Spattie
        *para filtrar que esos alumnos pertenezcan a una clase determinada de nuestra elección. De esta forma aplicamos 2 filtros al mismo tiempo a la consulta 
        */
        $alumnos = User::role('alumno')
        ->whereHas('relacion_clase_alumno', function ($query) use ($claseId) {
            $query->where('id', $claseId);
        })->get();

    return Inertia::render('Alumnos', [
        'alumnos' => $alumnos,
        'claseId' => $claseId,
    ]);
    }
}
