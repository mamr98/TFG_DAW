<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asignatura;

class AsignaturaSeeder extends Seeder
{
    public function run()
    {
        $asignaturas = [
            'Desarrollo web en entorno cliente',
            'Desarrollo web en entorno servidor',
            'Despliegue de aplicaciones web',
            'Diseño de interfaces web',
            'Inglés',
        ];

        foreach ($asignaturas as $asignatura) {
            Asignatura::create(['nombre' => $asignatura]);
        }
    }
}