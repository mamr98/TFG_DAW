<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaMaestra extends Model
{
    protected $table = 'respuestas_maestras';

    protected $fillable = ['examen_id', 'fila', 'columna'];

    public function examen()
{
    return $this->belongsTo(Examen::class, 'examen_id', 'id');
}
}
