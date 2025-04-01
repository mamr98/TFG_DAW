<?php

namespace App\Models;

use App\Models\User;
use App\Models\Examen;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    protected $table = "nota";

    protected $fillable = [
        'comentario',
        'nota',
        'id_alumno',
        'idExamen',
    ];

    public function user(){
        return $this->belongsTo(User::class,'idUsuario','id');
    }

    public function examen(){
        return $this->belongsTo(Examen::class,'idExamen','id');
    }
}
