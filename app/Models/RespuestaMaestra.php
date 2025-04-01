<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestaMaestra extends Model
{
    protected $table = 'respuestas_maestras';

    protected $fillable = [
        'id_profesor',
        'fila',
        'columna',
        'imagenCorrecta'
    ];

    public function profesor()
{
    return $this->belongsTo(Profesor::class, 'id_profesor', 'id');
}
}
