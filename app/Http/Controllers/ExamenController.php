<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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
            'fichero_profesor' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // Máximo 10MB
        ]);
        // Asignar el ID del profesor autenticado
        $validated['profesor_id'] = auth()->id(); // o auth()->user()->id

        // Añadir fecha_subida automáticamente
        $validated['fecha_subida'] = now(); // Fecha y hora actual

        // Guardar el archivo PDF
        if ($request->hasFile('fichero_profesor')) {
            $uploadedFile = $request->file('fichero_profesor');

            // Subir el archivo a Cloudinary
            $cloudinaryResponse = Cloudinary::upload($uploadedFile->getRealPath(), [
                'folder' => 'examenes',
                'resource_type' => 'auto' // Detecta automáticamente si es imagen o PDF
            ]);

            // Guardar la URL segura y el public_id en la base de datos
            $validated['fichero_profesor'] = $cloudinaryResponse->getSecurePath();
            $validated['public_id'] = $cloudinaryResponse->getPublicId();
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

        // Versión optimizada basada en tu consulta SQL funcional
        $examenes = DB::table('examen')
            ->whereIn('clase_id', function ($query) use ($alumnoId) {
                $query->select('clase_id')
                    ->from('clase_alumno')
                    ->where('alumno_id', $alumnoId);
            })
            ->whereNotIn('id', function ($query) use ($alumnoId) {
                $query->select('examen_id')
                    ->from('examen_alumno')
                    ->where('alumno_id', $alumnoId);
            })
            ->where('fecha_inicio', '<=', DB::raw('NOW()'))
            ->where('fecha_fin', '>=', DB::raw('NOW()'))
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
