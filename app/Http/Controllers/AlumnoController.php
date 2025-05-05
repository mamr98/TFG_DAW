<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Clase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlumnoController extends Controller
{
    public function index($claseId){
        /* 
        *Almacenamos en la variable $alumnos los usuarios que tengan el rol alumno.
        *Para ello, además hacemos uso de la relación relacion_clase_alumno y las utilidades role y whereHas de Spattie
        *para filtrar que esos alumnos pertenezcan a una clase determinada de nuestra elección. De esta forma aplicamos 2 filtros al mismo tiempo a la consulta 
        */

        $clase = Clase::find($claseId);

        $alumnos = User::role('alumno')
        ->whereHas('relacion_clase_alumno', function ($query) use ($claseId) {
            $query->where('id', $claseId);
        })->get();

    return Inertia::render('Alumnos', [
        'alumnos' => $alumnos,
        'claseId' => $claseId,
        'claseNombre' => $clase->nombre,
    ]);
    }

    public function update(Request $request)
{
    $updated = DB::table('clase_alumno')
        ->where('alumno_id', $request->idAlumno)
        ->where('clase_id', $request->idClaseAntiguo)
        ->update(['clase_id' => $request->idClaseNueva]);

    if ($updated) {
        return response()->json(['message' => 'Clase actualizada correctamente'], 200);
    } else {
        return response()->json(['message' => 'No se encontró ningún registro para actualizar'], 404);
    }
}
    

    public function obtenerClases()
{
    $clases = Clase::all(); // Obtiene todas las clases
    return response()->json($clases); // Devuelve las clases en formato JSON
}

}
