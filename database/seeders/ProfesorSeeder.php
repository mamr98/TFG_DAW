<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profesores = [
             [
                'nombre' => 'Miguel Milena',
                'email' => 'miguel.milena@ejemplo.com',
                'contraseña' => '12341234',
                'estado' => 'confirmado',
            ],/*
            [
                'name' => 'David Pelaez',
                'email' => 'david.pelaez@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
            ],
            [
                'name' => 'Marcos Garcia',
                'email' => 'marcos.garcia@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
            ],
            [
                'name' => 'Pablo Torre',
                'email' => 'pablo.torre@ejemplo.com',
                'password' => '12341234',
                'estado' => 'no_confirmado',
            ], */
        ];

        foreach ($profesores as $profesor) {
            User::create([
                'nombre' => $profesor['nombre'],
                'email' => $profesor['email'],
                'verificacion_email' => now(),
                'contraseña' => Hash::make($profesor['contraseña']),
                'rol' => 'profesor',
                'estado' => $profesor['estado'],
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
