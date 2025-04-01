<?php

namespace Database\Seeders;

use App\Models\Profesor;
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
             /* [
                'name' => 'Miguel Milena',
                'email' => 'miguel.milena@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
                'role' => 'profesor'
             ],*/
             [
                'name' => 'David Pelaez',
                'email' => 'david.pelaez@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
                'role' => 'profesor'
             ] 
        ];

        foreach ($profesores as $profesor) {
            Profesor::create([
                'name' => $profesor['name'],
                'email' => $profesor['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($profesor['password']),
                'role' => 'profesor',
                'estado' => $profesor['estado'],
                /* 'remember_token' => Str::random(10), */
            ]);
        }
    }
}
