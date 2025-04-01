<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    protected $table = "clase";

    protected $fillable = [
        'curso',
        'promocion',
        'id_alumno',
        'id_profesor',
    ];

    public function alumnos()
    {
        return $this->belongsToMany(Alumno::class, 'id_alumno', 'id');
    }

    public function examenes_clase()
    {
        return $this->hasMany(Examen_Clase::class, 'id_clase', 'id');
    }

    public function profesores_clase()
    {
        return $this->hasMany(Profesor_Clase::class, 'id_clase', 'id');
    }

}
