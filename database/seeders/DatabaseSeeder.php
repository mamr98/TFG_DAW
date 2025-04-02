<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\ProfesorSeeder;
use Database\Seeders\AlumnoSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            AsignaturaSeeder::class,
            ClaseSeeder::class,
        ]);
    }
}
