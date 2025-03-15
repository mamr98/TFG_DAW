<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use App\Models\Nota;
use App\Services\ComparacionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

// ESTE ES EL CONTROLADOR PARA COMPARAR LAS IMÁGENES
/* NO VA
    NO VA
    NO VA
    NO VA
    NO VA
    NO VA
*/

class ComparacionController extends Controller
{
    protected $comparacionService;

    public function __construct(ComparacionService $comparacionService)
    {
        $this->comparacionService = $comparacionService;
    }

    public function comparar(Request $request)
    {
        $request->validate([
            'idExamen' => 'required|exists:examen,id',
            'imagenAComparar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $examen = Examen::findOrFail($request->idExamen);
        $pathImagenCorrecta = $examen->imagenCorrecta;
        $pathImagenAComparar = $request->file('imagenAComparar')->store('public/examenes');

        $resultado = $this->comparacionService->compararImagenes(str_replace('public/', '', $pathImagenCorrecta), str_replace('public/', '', $pathImagenAComparar));

        // Guardar la nota
        $nota = Nota::create([
            'comentario' => 'Resultado de la comparación',
            'nota' => $resultado['porcentajeCoincidencia'],
            'idUsuario' => $request->user()->id,
            'idExamen' => $examen->id,
        ]);

        return response()->json([
            'mensaje' => 'Comparación realizada',
            'resultado' => $resultado,
            'nota' => $nota,
        ]);
    }
}
