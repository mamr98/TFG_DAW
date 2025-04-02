<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;

    protected $table = 'clase';

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
        return $this->belongsToMany(User::class, 'clase_profesor', 'clase_id', 'profesor_id')->where('rol', User::PROFESOR)->withTimestamps();
    }

    // Exámenes de la clase
    public function examenes()
    {
        return $this->hasMany(Examen::class);
    }
}
