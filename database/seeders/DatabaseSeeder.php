<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\ProfesorSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AsignaturaSeeder::class,
            ClaseSeeder::class,
            RoleSeeder::class,
            UsersSeeder::class,
        ]);
    }
}
