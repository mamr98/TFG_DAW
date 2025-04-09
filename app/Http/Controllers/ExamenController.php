<?php

namespace App\Http\Controllers;

use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Examen;
use Illuminate\Support\Facades\Auth;

class ExamenController extends Controller
{
    public function store(Request $request)
    {
        // Validación de los datos
        $validated = $request->validate([
            'nombre_examen' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'asignatura_id' => 'required|exists:asignatura,id',
            'clase_id' => 'required|exists:clase,id',
            'archivo' => 'required|file|mimes:pdf|max:10240', // Máximo 10MB
        ]);
        // Asignar el ID del profesor autenticado
        $validated['profesor_id'] = auth()->id(); // o auth()->user()->id

        // Añadir fecha_subida automáticamente
        $validated['fecha_subida'] = now(); // Fecha y hora actual

        // Guardar el archivo PDF
        if ($request->hasFile('archivo')) {
            $path = $request->file('archivo')->store('examenes'); // Guarda en storage/app/examenes
            $validated['archivo_path'] = $path;
        }

        // Crear el examen en la base de datos
        $examen = Examen::create($validated);

        // Redireccionar con mensaje de éxito
        return redirect()->route('panelprofesor')->with('success', 'Examen creado correctamente');
    }

    public function recogerAsignaturas()
    {
        $asignaturas = Asignatura::all();
        return response()->json($asignaturas);
    }

    public function recogerClases()
    {
        $profesorId = auth()->id(); // o el ID del profesor
        $clases = DB::table('clase_profesor')
            ->where('profesor_id', $profesorId)
            ->join('clase', 'clase_profesor.clase_id', '=', 'clase.id')
            ->select('clase.*')
            ->get();
        return response()->json($clases);
    }

    public function recogerExamenesAlumno()
{
    $alumnoId = auth()->id();

    // Obtener los IDs de las clases del alumno
    $claseIds = DB::table('clase_alumno')
        ->where('alumno_id', $alumnoId)
        ->pluck('clase_id');

    // Obtener los IDs de los exámenes que ya ha realizado el alumno
    $examenesRealizados = DB::table('examen_alumno')
        ->where('alumno_id', $alumnoId)
        ->pluck('examen_id');

    // Obtener los exámenes que pertenecen a las clases del alumno
    // y que aún no han sido realizados por él
    $examenes = Examen::whereIn('clase_id', $claseIds)
        ->whereNotIn('id', $examenesRealizados)
        ->get();

    return $examenes;
}


    public function recogerExamenesProfesor()
    {
        $examenes = Examen::where('profesor_id', auth()->id())->get();

        $resultado = $examenes->map(function ($examen) {
            $asignatura = Asignatura::find($examen->asignatura_id);

            return [
                'examen' => $examen,
                'asignatura' => $asignatura,
            ];
        });

        return response()->json($resultado);
    }

    public function crearExamenAlumno(String $idExamen)
    {
        DB::table('examen_alumno')->insert([
            'alumno_id' => auth()->id(),
            'examen_id' => $idExamen,
            'fecha_subida' => now(),
            'created_at' => now(),
            'updated_at' => now()
        ]);
        return redirect()->route('subir-imagen')->with('success', 'Examen subido correctamente');
    }

    public function actualizarExamen(Request $request, $id)
    {
        // Validación de los datos
        $validated = $request->validate([
            'nombre_examen' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'asignatura_id' => 'required|exists:asignatura,id',
            'clase_id' => 'required|exists:clase,id',
        ]);

        // Buscar el examen y verificar que pertenece al profesor
        $examen = Examen::where('profesor_id', auth()->id())
            ->findOrFail($id);

        // Actualizar el examen
        $examen->update($validated);

        // Obtener la asignatura actualizada
        $asignatura = Asignatura::find($examen->asignatura_id);

        // Devolver respuesta JSON
        return response()->json([
            'success' => true,
            'message' => 'Examen actualizado correctamente',
            'data' => [
                'examen' => $examen,
                'asignatura' => $asignatura,
            ]
        ]);
    }

    public function deleteExamen($id)
    {
        $examen = Examen::findOrFail($id);

        // Verificar que el examen pertenece al profesor
        if ($examen->profesor_id !== Auth::id()) {
            return response()->json(['error' => 'No tienes permiso para eliminar este examen'], 403);
        }

        // Eliminar el examen
        $examen->delete();

        return redirect()->back()->with('success', 'Examen eliminado correctamente');
    }
}