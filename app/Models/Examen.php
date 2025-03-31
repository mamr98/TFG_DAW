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
        'idUsuario',
        'id_imagenAComparar',
        'id_imagenCorrecta',
        'codigo'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'idUsuario');
    }

    public function nota(){
        return $this->hasOne(Nota::class,'idExamen','id');
    }
     public function respuestasAlumno()
    {
        return $this->belongsTo(RespuestaAlumno::class, 'id_imagenAComparar');
    }

    public function respuestasMaestra(){
        return $this->belongsTo(RespuestaMaestra::class, 'id_imagenCorrecta');
    }

   

    public function respuestasMaestras()
    {
        return $this->hasMany(RespuestaMaestra::class, 'idExamen', 'id');
    }

    public function respuestasAlumnos()
    {
        return $this->hasMany(RespuestaAlumno::class, 'idExamen', 'id');
    }
}
