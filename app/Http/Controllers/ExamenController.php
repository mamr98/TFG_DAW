<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use App\Models\Examen;
use App\Models\Asignatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\CloudinaryService;

// HAY QUE MODIFICAR COSAS
// En teoría este controlador es solo para subir las Imágenes
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// NO VAAAAA

class ExamenController extends Controller
{
   /*  protected $cloudinaryService;

    public function __construct(CloudinaryService $cloudinaryService)
    {
        $this->cloudinaryService = $cloudinaryService;
    }

    public function subirImagen(Request $request)
    {
        $request->validate(['imagen' => 'required|image']);

        $imagenUrl = $this->cloudinaryService->uploadImage($request->file('imagen'));

        $examen = Examen::create([
            'preguntas' => $request->preguntas,
            'asignatura' => $request->asignatura,
            'imagenCorrecta' => $imagenUrl,
            'idUsuario' => auth()->id(),
        ]);

        return response()->json(['message' => 'Imagen subida con éxito', 'url' => $imagenUrl]);
    } */

    public function subirExamenMaestro(Request $request)
    {
        // Validar imagen y datos
        $validated = $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg',
            'nombre_examen' => 'required|string|max:255',
        ]);

        // Usa la relación para crear el examen
        $examen = auth()->user()->examenes()->create([
            'nombre' => $validated['nombre_examen'],
            'fecha_subida' => now(),
        ]);
        $respuestas = $this->procesarImagenConOpenAI($request->file('imagen'));

        foreach ($respuestas as $respuesta) { // Corregido aquí
            RespuestaMaestra::create([ // Corregido aquí
                'examen_id' => $examen->id,
                'fila' => $respuesta['fila'],
                'columna' => $respuesta['columna'],
            ]);
        }

        return redirect()->route('profesor.examen')
            ->with('success', 'Examen subido correctamente');
    }

    private function procesarImagenConOpenAI($imagen)
    {
        $imagenBase64 = base64_encode(file_get_contents($imagen->path())); // Corregido aquí

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'), // Añadido espacio
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4-vision-preview', // Corregido aquí
            'messages' => [
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => "Extrae las respuestas correctas de esta tabla en formato JSON. Ejmplo: {'repuestas': [{'respuestas': [{'fila':1, 'columna': 'A'}]}]}",
                        ],
                        [
                            'type' => 'image_url',
                            'image_url' => "data:image/jpeg;base64,{$imagenBase64}",
                        ],
                    ],
                ],
            ],
        ]);

        return json_decode($response->json()['choices'][0]['message']['content'], true)['respuestas'];
    }

    public function subirExamenAlumno(Request $request)
    {
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png',
            'examen_id' => 'required|exists:examenes,id',
        ]);

        // Procesar imagen del alumno con OpenAI
        $respuestasAlumno = $this->procesarImagenConOpenAI($request->file('imagen'));

        // Obtener respuestas maestras
        $respuestasMaestras = RespuestaMaestra::where('examen_id', $request->examen_id)->get();

        // Comparar respuestas y calcular nota
        $aciertos = 0;
        foreach ($respuestasMaestras as $maestra) {
            $coincide = collect($respuestasAlumno)->contains(function ($respuesta) use ($maestra) {
                return $respuesta['fila'] == $maestra->fila && $respuesta['columna'] == $maestra->columna;
            });
            if ($coincide) $aciertos++;
        }

        $nota = ($aciertos / $respuestasMaestras->count()) * 10;

        // Guardar respuestas y nota del alumno
        $respuestaAlumno = RespuestaAlumno::create([
            'examen_id' => $request->examen_id,
            'user_id' => auth()->id(),
            'nota' => $nota,
        ]);

        //return response()->json(['nota' => $nota]);
        return redirect()->route('alumno.examen')
        ->with('nota', $nota); // Pasar la nota a la vista
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
