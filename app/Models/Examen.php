<?php

namespace App\Models;

use App\Models;
use App\Models\Nota;
use App\Models\User;
use App\Models\RespuestaAlumno;
use App\Models\RespuestaMaestra;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $table = "examen";

    protected $fillable = [
        'asignatura',
        'preguntas',
        'id_alumno',
        'id_imagenAComparar',
        'id_imagenCorrecta',
        'codigo'
    ];

    public function user(){
        return $this->belongsTo(Alumno::class, 'id_alumno');
    }

    public function nota(){
        return $this->hasOne(Nota::class,'idExamen','id');
    }
     public function respuestasAlumno()
    {
        return $this->belongsTo(RespuestaAlumno::class, 'id_imagenAComparar');
    }

    public function respuestasMaestras(){
        return $this->belongsTo(RespuestaMaestra::class, 'id_imagenCorrecta');
    }

    public function examenes_clase()
    {
        return $this->hasMany(Examen_Clase::class, 'id_examen', 'id');
    }
}
