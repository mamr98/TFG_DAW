<?php

namespace App\Http\Controllers;

use App\Services\CloudinaryService;
use App\Models\Examen;
use Illuminate\Http\Request;

// HAY QUE MODIFICAR COSAS
// En teoría este controlador es solo para subir las Imágenes
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// HAY QUE MODIFICAR COSAS
// NO VAAAAA

class ExamenController extends Controller
{
    protected $cloudinaryService;

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
    }
}
