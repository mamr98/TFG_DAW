<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}
