<?php
namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotasController extends Controller
{
    public function index()
    {
        $notas = Examen::with(['alumnos', 'asignatura'])
            ->get()
            ->flatMap(function ($examen) {
                return $examen->alumnos->map(function ($alumno) use ($examen) {
                    return [
                        'alumno' => $alumno->name,
                        'nota' => $alumno->pivot->nota,
                        'examen' => $examen->nombre,
                        'asignatura' => $examen->asignatura->nombre,
                    ];
                });
            });

        return Inertia::render('NotasPage', [
            'notas' => $notas,
        ]);
    }
}
