<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Clase;
use Illuminate\Http\JsonResponse;


class DashboardController extends Controller
{
    public function __invoke() // O puedes usar index() si prefieres
    {
        $user = auth()->user();

        $stats = [
            'aprobados' => $user->exams_passed_percentage,
            'realizados' => $user->exams_taken_count,
            'promedio' => $user->average_score,
            'progreso' => $user->course_progress
        ];

        return inertia('Dashboard', compact('stats'));
    }

    public function dashboard()
    {
        $activos = User::where('estado', 1)->count();
        $inactivos = User::where('estado', 0)->count();

        $examenesPorProfesor = DB::table('examen')
            ->join('users', 'examen.profesor_id', '=', 'users.id')
            ->select('users.name as profesor', DB::raw('count(*) as total'))
            ->groupBy('profesor')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        $examenesMes1 = DB::table('examen')
            ->select(
                DB::raw("DATE_FORMAT(fecha_subida, '%m') as mes"),
                DB::raw('count(*) as total')
            )
            ->groupBy('mes')
            ->get();

        $examenesMes2 = DB::table('examen_alumno')
            ->select(
                DB::raw("DATE_FORMAT(fecha_subida, '%m') as mes"),
                DB::raw('count(*) as total')
            )
            ->whereNotNull('fecha_subida')
            ->groupBy('mes')
            ->get();

        // Combinar ambos conjuntos de datos
        $mesesRaw = collect($examenesMes1)
            ->merge($examenesMes2)
            ->groupBy('mes')
            ->map(function ($items) {
                return [
                    'mes' => $items[0]->mes,
                    'total' => $items->sum('total'),
                ];
            });

        // Nombres de los meses académicos
        $meses = [
            '09' => 'Septiembre',
            '10' => 'Octubre',
            '11' => 'Noviembre',
            '12' => 'Diciembre',
            '01' => 'Enero',
            '02' => 'Febrero',
            '03' => 'Marzo',
            '04' => 'Abril',
            '05' => 'Mayo',
        ];

        // Preparar datos en orden correcto
        $dataMeses = collect($meses)->map(function ($nombre, $numero) use ($mesesRaw) {
            $item = $mesesRaw->get($numero);
            return [
                'mes' => $nombre,
                'total' => $item['total'] ?? 0,
            ];
        })->values();

        return Inertia::render('Dashboard', [
            'stats' => [
                'usuarios' => [
                    'activos' => $activos,
                    'inactivos' => $inactivos,
                    'total' => $activos + $inactivos,
                ],
                'examenes_por_profesor' => $examenesPorProfesor,
                'examenes_por_mes' => $dataMeses,
            ],
        ]);
    }

    public function clasesAsignadas()
    {
        $profesor = Auth::user();

        $clases = $profesor->relacion_clase_profesor()
            ->select('clase.id', 'clase.nombre')
            ->get();

        return response()->json($clases);
    }
    public function getTotalExamenes()
    {
        $totalExamenes = Examen::count(); // Obtiene el total de registros en la tabla 'examenes'
        return response()->json(['total' => $totalExamenes]);
    }
    public function getTotalExamenesPorProfesor()
    {
        $totalExamenes = Examen::where('profesor_id', Auth::user()->id)->count();
        return response()->json(['total' => $totalExamenes]);
    }
}
