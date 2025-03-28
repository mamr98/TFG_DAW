<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaAlumno extends Model
{
    protected $table = "respuestas_alumnos";

    protected $fillable = [
        'idExamen',
        'idUsuario',
        'fila',
        'imagenAComparar',
        '',
    ];

    public function user(){
        return $this->belongsTo(User::class,'idUsuario','id');
    }

    public function examen(){
        return $this->belongsTo(Examen::class,'idExamen','id');
    }
}
