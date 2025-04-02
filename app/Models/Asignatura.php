<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignatura extends Model
{
    use HasFactory;

    protected $table = 'asignatura';

    protected $fillable = [
        'nombre'
    ];

    // Exámenes de la asignatura
    public function examenes()
    {
        return $this->hasMany(Examen::class);
    }
}