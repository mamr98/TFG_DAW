<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AsignaturasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        

        $asignaturas = Asignatura::all();

        return Inertia::render('Profesor/Asignaturas', [
            'asignaturas' => $asignaturas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
{
    // Validar con mensaje personalizado
    $request->validate([
        'nombre' => 'required|string|max:45',
    ], [
        'nombre.max' => 'El nombre es demasiado largo para la asignatura',
    ]);

    $asignatura = new Asignatura();
    $asignatura->nombre = $request->input('nombre');
    $asignatura->save();

    return response()->json($asignatura);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
{
    // Obtener el ID desde el cuerpo del request
    $id = $request->input('id');

    // Buscar la asignatura por ID
    $asignatura = Asignatura::findOrFail($id);

    // Actualizar los campos con los datos recibidos
    $asignatura->update($request->all());

    // Devolver la asignatura actualizada como respuesta JSON
    return response()->json($asignatura);
}

    /**
     * Remove the specified resource from storage.
     */

public function destroy(Request $request)
{
    $id = $request->input('id');

    $asignatura = Asignatura::find($id);

    if (!$asignatura) {
        return response()->json(['error' => 'Asignatura no encontrada'], 404);
    }

    // Verificar si hay exámenes asociados directamente en la tabla 'examen'
    $examenAsociado = DB::table('examen')
        ->where('asignatura_id', $id)
        ->exists();

    if ($examenAsociado) {
        return response()->json(['error' => 'No se puede eliminar la asignatura porque está asociada a uno o más exámenes'], 400);
    }

    $asignatura->delete();

    return response()->json(null, 204);
}


}
