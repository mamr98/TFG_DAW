<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Http\Controllers\Aws\TextractController;
use Illuminate\Support\Facades\Storage;

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
            'fichero_profesor' => 'required|file|mimes:jpg,jpeg,png|max:10240', // Solo imágenes para el análisis
        ]);

        try {
            // Asignar el ID del profesor autenticado
            $validated['profesor_id'] = auth()->id();
            $validated['fecha_subida'] = now();

            // Subir el archivo a Cloudinary
            $uploadedFile = $request->file('fichero_profesor');
            $cloudinaryResponse = Cloudinary::upload($uploadedFile->getRealPath(), [
                'folder' => 'examenes',
                'resource_type' => 'image',
                'quality_analysis' => true,
                'transformation' => [
                    ['quality' => 'auto:best'],
                    ['effect' => 'improve'],
                    ['ocr' => 'adv_ocr']
                ]
            ]);

            $validated['fichero_profesor'] = $cloudinaryResponse->getSecurePath();
            $validated['public_id'] = $cloudinaryResponse->getPublicId();

            // Procesar con Textract
            $textractController = new TextractController();
            $analysis = $textractController->analyzeImageFromUrl(new Request([
                'image_url' => $validated['fichero_profesor']
            ]));

            $analysisData = json_decode($analysis->getContent());

            if (!$analysisData->success || empty($analysisData->extracted_data->respuestas_correctas)) {
                throw new \Exception("No se pudieron identificar las respuestas correctas en el examen");
            }

            $validated['json_examen'] = json_decode(json_encode($analysisData->extracted_data), true); // Guardamos como array


            // Crear el examen
            $examen = Examen::create($validated);

            return redirect()->route('panelprofesor')
                ->with('success', 'Examen creado y procesado correctamente')
                ->with('examen_data', $examen->json_examen);
        } catch (\Exception $e) {
            // Eliminar la imagen de Cloudinary si hubo error
            if (isset($cloudinaryResponse)) {
                try {
                    Cloudinary::destroy($cloudinaryResponse->getPublicId());
                } catch (\Exception $cloudinaryError) {
                    \Log::error('Error al eliminar imagen de Cloudinary: ' . $cloudinaryError->getMessage());
                }
            }

            return back()
                ->withInput()
                ->with('error', 'Error al crear el examen: ' . $e->getMessage());
        }
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
        $examenes = Examen::with('asignatura')
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
                'respuestas_correctas' => $examen->json_examen['respuestas_correctas'] ?? null
            ];
        });

        return response()->json($resultado);
    }
    public function crearExamenAlumno(Request $request, $idExamen)
    {
        // Validación
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg|max:10240', // 10MB máximo
        ]);

        try {
            $examenProfesor = Examen::findOrFail($idExamen);
            
            if (!$examenProfesor->json_examen || !isset($examenProfesor->json_examen['respuestas_correctas'])) {
                throw new \Exception("El examen del profesor no tiene respuestas correctas definidas");
            }
            // Subir a Cloudinary con análisis de calidad
            $uploadedFile = $request->file('imagen');
            $cloudinaryResponse = Cloudinary::upload($uploadedFile->getRealPath(), [
                'folder' => 'examenes/alumnos',
                'resource_type' => 'image',
                'quality_analysis' => true,
                'transformation' => [
                    ['quality' => 'auto:best'],
                    ['effect' => 'improve'],
                    ['ocr' => 'adv_ocr']
                ]
            ]);

            // Procesado por Textract 
            $textractController = new TextractController();
            $analysis = $textractController->analyzeImageFromUrl(new Request([
                'image_url' => $cloudinaryResponse->getSecurePath()
            ]));

            $analysisData = json_decode($analysis->getContent());

            if (!$analysisData->success || empty($analysisData->extracted_data->respuestas_correctas)) {
                throw new \Exception("No se pudieron identificar las respuestas correctas en el examen");
            }

            $respuestasAlumno = [];

            if (!empty($analysisData->extracted_data->estructura)) {
                foreach ($analysisData->extracted_data->estructura as $item) {
                    if ($item->seleccionada) {
                        $respuestasAlumno[(string)$item->pregunta] = strtoupper(trim($item->opcion));
                    }
                }
            }
            $respuestasCorrectas = $examenProfesor->json_examen['respuestas_correctas'];
            
            $nota = $this->calcularNota($respuestasAlumno, $respuestasCorrectas);

            // Insertar en la base de datos
            DB::table('examen_alumno')->insert([
                'alumno_id' => auth()->id(),
                'examen_id' => $idExamen,
                'fecha_subida' => now(),
                'fichero_alumno' => $cloudinaryResponse->getSecurePath(),
                'json_alumno' => $analysisData->success ? json_encode($analysisData->extracted_data) : null,
                'nota' => $nota,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Examen subido y procesado correctamente',
                'image_url' => $cloudinaryResponse->getSecurePath(),
                'analysis_data' => $analysisData->extracted_data ?? null
            ]);

        } catch (\Exception $e) {
            // Eliminar de Cloudinary si hubo error
            if (isset($cloudinaryResponse)) {
                try {
                    Cloudinary::destroy($cloudinaryResponse->getPublicId());
                } catch (\Exception $cloudinaryError) {
                    Log::error('Error al eliminar imagen de Cloudinary: '.$cloudinaryError->getMessage());
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al procesar el examen: '.$e->getMessage()
            ], 500);
        }
    }

    private function calcularNota(array $respuestasAlumno, array $respuestasCorrectas): float
    {
        $totalPreguntas = count($respuestasCorrectas);
        $aciertos = 0;
        
        foreach ($respuestasCorrectas as $pregunta => $correcta) {
            if (isset($respuestasAlumno[$pregunta]) && $respuestasAlumno[$pregunta] === $correcta){
                $aciertos++;
            }
        }
        
        // Calcula nota sobre 10
        return round(($aciertos / $totalPreguntas) * 10, 2);
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

        return redirect()->back()->with('success', '');
    }

    public function getExamenData($id)
    {
        $examen = Examen::with(['asignatura', 'clase'])
            ->where('id', $id)
            ->firstOrFail();

        return response()->json([
            'examen' => $examen,
            'respuestas_correctas' => $examen->json_examen['respuestas_correctas'] ?? []
        ]);
    }

    public function buscarExamenes($nombre)
    {
        $examenes = Examen::where('nombre_examen', 'LIKE', "%{$nombre}%")->get();

        return response()->json($examenes, 200);
    }
}
