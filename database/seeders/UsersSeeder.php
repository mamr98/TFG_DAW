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
                'rol' => 3,
                'estado' => true,
                'email_verified_at' => now()
            ],
        ];

        foreach ($administradores as $admin) {
            User::create($admin);
        }

        // 2. Profesores (pre-creados y validados)
        $profesores = [
            [
                'name' => 'Juan',
                'email' => 'j.perez@escuela.com',
                'password' => '12341234',
                'rol' => 2,
                'estado' => true,
                'email_verified_at' => now()
            ],
            [
                'name' => 'Marta',
                'email' => 'm.milena@escuela.com',
                'password' => '12341234',
                'rol' => 2,
                'estado' => true,
                'email_verified_at' => now()
            ],
        ];

        foreach ($profesores as $profesor) {
            User::create($profesor);
        }

        // 3. Alumnos - NO creamos ninguno, se registrarán via Breeze
    }
}