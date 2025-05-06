<?php

namespace App\Http\Controllers;

use App\Exports\ExamenAlumnoExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function index(){
        return view();
    }


    public function export(){
        return Excel::download(new ExamenAlumnoExport, 'ResultadosExamen.xlsx');
    }

}
