<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaMaestra extends Model
{
    protected $table = 'respuestas_maestras';

    protected $fillable = [
        'idUsuario',
        'fila',
        'columna',
        'imagenCorrecta'
    ];

    public function user()
{
    return $this->belongsTo(User::class, 'idUsuario', 'id');
}
}
