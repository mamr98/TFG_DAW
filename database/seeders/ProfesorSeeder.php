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
                'name' => 'Miguel Milena',
                'email' => 'miguel.milena@ejemplo.com',
                'password' => '12341234',
            ],
            [
                'name' => 'David Pelaez',
                'email' => 'david.pelaez@ejemplo.com',
                'password' => '12341234',
            ],
            [
                'name' => 'Marcos Garcia',
                'email' => 'marcos.garcia@ejemplo.com',
                'password' => '12341234',
            ],
            [
                'name' => 'Pablo Torre',
                'email' => 'pablo.torre@ejemplo.com',
                'password' => '12341234',
            ],
        ];

        foreach ($profesores as $profesor) {
            User::create([
                'name' => $profesor['name'],
                'email' => $profesor['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($profesor['password']),
                'role' => 'profesor',
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
