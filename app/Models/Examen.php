<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    use HasFactory;

    protected $table = 'examen';

    protected $fillable = [
        'profesor_id',
        'fecha_subida',
        'clase_id',
        'asignatura_id',
        'fichero_profesor',
        'fecha_inicio',
        'fecha_fin',
        'nombre_examen',
        'json_examen'
    ];

    protected $casts = [
        'json_examen' => 'array',
        'fecha_subida' => 'datetime',
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime',
    ];

    // Profesor que creó el examen
    public function profesor()
    {
        return $this->belongsTo(User::class, 'profesor_id');
    }

    // Clase a la que pertenece el examen
    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }

    // Asignatura del examen
    public function asignatura()
    {
        return $this->belongsTo(Asignatura::class);
    }

    // Alumnos que han realizado el examen
    public function alumnos()
    {
        return $this->belongsToMany(User::class, 'examen_alumno', 'examen_id', 'alumno_id')
                   ->withPivot(['fecha_subida', 'fichero_alumno', 'json_alumno', 'nota'])
                   ->withTimestamps();
    }

    // Método para verificar si el examen está activo
    public function estaActivo()
    {
        $now = now(); // con esto vamos a obtener la hora actual
        return $this->fecha_inicio <= $now && $this->fecha_fin >= $now;
    }

    /*

      Determina el estado actual del examen

      @return string 'pendiente'|'activo'|'finalizado'

    */
    public function estadoExamen()
    {
        $now = now();

        if ($now < $this->fecha_inicio) {
            return 'pendiente';
        } elseif ($now > $this->fecha_fin) {
            return 'finalizado';
        } else {
            return 'activo';
        }
    }
}