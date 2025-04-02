<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre'
    ];

    // Alumnos de la clase
    public function alumnos()
    {
        return $this->belongToMany(User::class, 'clase_alumno')->where('rol', User::ALUMNO);
    }
    // Profesores de la clase
    public function profesores()
    {
        return $this->belongsToMany(User::class, 'clase_profesor')->where('rol', User::PROFESOR);
    }

    // Exámenes de la clase
    public function examenes()
    {
        return $this->hasMany(Examen::class);
    }
}
