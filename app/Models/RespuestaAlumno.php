<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaAlumno extends Model
{
    protected $table = "respuestas_alumnos";

    protected $fillable = [
        'idUsuario',
        'fila',
        'imagenAComparar',
        'columna',
    ];

    public function user(){
        return $this->belongsTo(User::class,'idUsuario','id');
    }
}
