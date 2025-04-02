<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class examen_clase extends Model
{
    protected $fillable = [
        'id_examen',
        'id_clase',
        'fecha',
    ];

    public function examen()
    {
        return $this->belongsTo(Examen::class, 'id_examen');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'id_clase');
    }
}
