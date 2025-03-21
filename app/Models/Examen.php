<?php

namespace App\Models;

use App\Models;
use App\Models\Nota;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $table = "examen";

    protected $fillable = [
        'asignatura',
        'preguntas',
        'imagenCorrecta',
        'imagenAComparar',
        'idUsuario',
    ];

    public function user(){
        return $this->belongsTo(User::class,'idUsuario','id');
    }

    public function nota(){
        return $this->hasOne(Nota::class,'idExamen','id');
    }
}
