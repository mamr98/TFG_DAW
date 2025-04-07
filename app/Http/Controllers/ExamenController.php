<?php

namespace App\Http\Controllers;

use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Examen; // Asegúrate de tener este modelo

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
        return redirect()->back()->with('success', 'Examen creado correctamente');
    }

    public function generarCodigoExamen(){
        do {
            $code = $this->ExamCode(); // Genera el código
        } while (Examen::where('codigo', $code)->exists()); // Verifica que sea unico

        return $code;
    }

    public function recogerAsignaturas(){
        $asignaturas = Asignatura::all();
        return response()->json($asignaturas);
    }
    
    public function recogerClases(){
    $profesorId = auth()->id(); // o el ID del profesor
    $clases = DB::table('clase_profesor')
        ->where('profesor_id', $profesorId)
        ->join('clase', 'clase_profesor.clase_id', '=', 'clase.id')
        ->select('clase.*')
        ->get();
    return response()->json($clases);
    }
}