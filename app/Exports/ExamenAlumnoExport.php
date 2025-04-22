<?php

namespace App\Exports;

use App\Models\ExamenAlumno;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExamenAlumnoExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ExamenAlumno::all();
    }
}
