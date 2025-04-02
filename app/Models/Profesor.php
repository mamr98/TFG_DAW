<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Profesor extends Model
{
     /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable;

  protected $table = 'profesor';
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
  public function profesores_clase()
    {
        return $this->hasMany(Profesor_Clase::class, 'id_profesor', 'id');
    }

    public function respuestasMaestras()
    {
        return $this->hasMany(RespuestaMaestra::class, 'id_profesor');
    }
}
