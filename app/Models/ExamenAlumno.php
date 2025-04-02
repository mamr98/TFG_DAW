<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamenAlumno extends Model
{
    use HasFactory;

    protected $table = 'examen_alumno';

    protected $fillable = [
        'alumno_id',
        'examen_id',
        'fecha_subida',
        'fichero_alumno',
        'json_alumno',
        'nota'
    ];

    protected $casts = [
        'json_alumno' => 'array',
        'fecha_subida' => 'datetime',
        'nota' => 'decimal:2',
    ];

    public function alumno()
    {
        return $this->belongsTo(User::class, 'alumno_id');
    }

    public function examen()
    {
        return $this->belongsTo(Examen::class);
    }
}