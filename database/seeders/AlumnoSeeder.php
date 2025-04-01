<?php

namespace Database\Seeders;

use App\Models\Alumno;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alumnos = [
             [
                'name' => 'Miguel Milena',
                'email' => 'miguel.milena@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
                'role' => 'alumno'
             ],
             /* [
                'name' => 'David Pelaez',
                'email' => 'david.pelaez@ejemplo.com',
                'password' => '12341234',
                'estado' => 'confirmado',
                'role' => 'alumno'
             ]  */
        ];

        foreach ($alumnos as $alumno) {
            Alumno::create([
                'name' => $alumno['name'],
                'email' => $alumno['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($alumno['password']),
                'role' => 'alumno',
                'estado' => $alumno['estado'],
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
