<?php

namespace App\Models;

use App\Models\Nota;
use App\Models\Examen;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'estado',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relacion con clases (alumno)
    public function relacion_clase_alumno()
    {
        return $this->belongsToMany(Clase::class, 'clase_alumno');
    }

    // Relacion con profesor (profesor)
    public function relacion_clase_profesor()
    {
        return $this->belongsToMany(Clase::class, 'clase_profesor', 'profesor_id', 'clase_id');
    }

    // 1. Exámenes asignados como alumno (ya lo tenías)
    public function examenesAsignados()
    {
        return $this->belongsToMany(Examen::class, 'examen_alumno', 'examen_id', 'alumno_id')
                   ->withPivot(['fecha_subida', 'fichero_alumno', 'json_alumno', 'nota'])
                   ->withTimestamps();
    }

    // 2. Exámenes creados como profesor (NUEVA)
    public function examenesCreados()
    {
        return $this->hasMany(Examen::class, 'profesor_id');
    }

    // 3. Exámenes calificados (a través de ExamenAlumno) (NUEVA)
    public function examenesCalificados()
    {
        return $this->hasManyThrough(
            ExamenAlumno::class,
            Examen::class,
            'profesor_id', // FK en tabla examenes
            'examen_id',   // FK en tabla examen_alumno
            'id',         // PK en users
            'id'          // PK en examenes
        );
    }

    // Método para obtener todos los exámenes relacionados con el usuario
    public function todosLosExamenes()
    {
        return $this->esProfesor() 
            ? $this->examenesCreados()
            : $this->examenesAsignados();
    }
}
