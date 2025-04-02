<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Alumno extends Model
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable;

  protected $table = 'alumno';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
      'name',
      'email',
      'password',
      'role',
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

  /**
   * Get the exams created by the user.
   */
  public function clases()
  {
      return $this->hasMany(Clase::class, 'id_alumno', 'id');
  }

  public function examenes()
  {
      return $this->hasMany(RespuestaAlumno::class, 'id_alumno');
  }

  public function notas()
  {
      return $this->hasMany(Nota::class, 'id_alumno');
  }
}
