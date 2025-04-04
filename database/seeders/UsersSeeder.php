<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        // 1. Administradores (pre-creados y validados)
        $administradores = [
            [
                'name' => 'Admin',
                'email' => 'admin@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
        ];

        foreach ($administradores as $admin) {
            User::create($admin)->assignRole('admin');
        }

        // 2. Profesores (pre-creados y validados)
        $profesores = [
            [
                'name' => 'Juan',
                'email' => 'j.perez@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'Marta',
                'email' => 'm.milena@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'David',
                'email' => 'd.pelaez@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
        ];

        foreach ($profesores as $profesor) {
            User::create($profesor)->assignRole('profesor');
        }

        // 3. Alumnos (pre-creados y validados)

        $alumnos = [
            [
                'name' => 'Miguel',
                'email' => 'miguel@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'David',
                'email' => 'david@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'Pablo',
                'email' => 'pablo@escuela.com',
                'password' => '12341234',
                'estado' => true,
                'email_verified_at' => now()
            ],
        ];

        foreach ($alumnos as $alumno) {
            User::create($alumno)->assignRole('alumno');
        }
    }
}