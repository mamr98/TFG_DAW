<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaAlumno extends Model
{
    protected $table = "respuestas_alumnos";

    protected $fillable = [
        'id_alumno',
        'fila',
        'imagenAComparar',
        'columna',
    ];

    public function alumno(){
        return $this->belongsTo(Alumno::class,'id_alumno');
    }
}
