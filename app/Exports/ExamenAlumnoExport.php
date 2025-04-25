<?php

namespace App\Exports;

use App\Models\ExamenAlumno;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View; // Importar esta librería para utilizar una vista en vez de una colección
use Maatwebsite\Excel\Concerns\FromView; // Importar esta librería para utilizar una vista en vez de una colección

class ExamenAlumnoExport implements FromCollection //FromView 
{
    /**
    * @return \Illuminate\Support\Collection
    */
    /* public function collection()
    {
        return ExamenAlumno::all();
    } */

    public function view(): View
    {
        return view('(nombre de la vista)',[
            'variable del foreach' => ExamenAlumno::all()
        ]);
    }

    // recogeria de la base de datos el nombre del alumno y su nota pero no se si funciona tengo que mirarlo
    public function collection()
{
    return ExamenAlumno::with('alumno:id,name')
        ->get()
        ->map(function ($examenAlumno) {
            return [
                'Nombre del Alumno' => $examenAlumno->alumno->name ?? 'Sin nombre',
                'Nota' => $examenAlumno->nota,
            ];
        });
}



}
