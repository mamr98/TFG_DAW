<?php
namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class NotasController extends Controller
{
    public function index()
    {
        $user = auth()->user();
    
        // Si es profesor, retorna todas las notas
        if ($user->can('permisoprofesor')) {
            $notas = Examen::with(['alumnos', 'asignatura'])
                ->get()
                ->flatMap(function ($examen) {
                    return $examen->alumnos->map(function ($alumno) use ($examen) {
                        return [
                            'alumno' => $alumno->name,
                            'nota' => $alumno->pivot->nota,
                            'examen' => $examen->nombre_examen,
                            'asignatura' => $examen->asignatura->nombre,
                        ];
                    });
                });
        } else {
            // Si es alumno, solo muestra sus propias notas
            $notas = Examen::with(['alumnos', 'asignatura'])
                ->whereHas('alumnos', function ($query) use ($user) {
                    $query->where('alumno_id', $user->id);
                })
                ->get()
                ->flatMap(function ($examen) use ($user) {
                    return $examen->alumnos
                        ->where('id', $user->id)
                        ->map(function ($alumno) use ($examen) {
                            return [
                                'alumno' => $alumno->name,
                                'nota' => $alumno->pivot->nota,
                                'examen' => $examen->nombre_examen,
                                'asignatura' => $examen->asignatura->nombre,
                            ];
                        });
                });
        }
    
        return Inertia::render('NotasPage', [
            'notas' => $notas,
        ]);
    }
}
