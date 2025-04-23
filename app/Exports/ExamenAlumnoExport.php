<?php

namespace App\Exports;

use App\Models\ExamenAlumno;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\View\View; // Importar esta librería para utilizar una vista en vez de una colección
use Maatwebsite\Excel\Concerns\FromView; // Importar esta librería para utilizar una vista en vez de una colección

class ExamenAlumnoExport implements FromView //FromCollection
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

}
