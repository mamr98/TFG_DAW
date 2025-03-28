<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaMaestra extends Model
{
    protected $table = 'respuestas_maestras';

    protected $fillable = ['idExamen','idUsuario', 'fila', 'columna', 'imagenCorrecta'];

    public function examen()
{
    return $this->belongsTo(Examen::class, 'idExamen', 'id');
    return $this->belongsTo(User::class, 'idUsuario', 'id');
}
}
