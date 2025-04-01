<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profesor_Clase extends Model
{
    protected $fillable = [
        'id_profesor',
        'id_clase',
    ];

    public function profesor()
    {
        return $this->belongsTo(Profesor::class, 'id_profesor');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'id_clase');
    }
}
