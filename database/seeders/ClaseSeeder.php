<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clase;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ClaseSeeder extends Seeder
{
    public function run()
    {
        // Limpiar tabla pivote primero
        DB::table('clase_profesor')->truncate();

        $clases = [
            '1DAW',
            '2DAW',
            '1DAM',
            '2DAM',
            '1MARKETING',
            '2MARKETING',
        ];

        // Crear las clases
        foreach ($clases as $nombreClase) {
            Clase::create(['nombre' => $nombreClase]);
        }

        /* // Obtener todos los profesores disponibles
        $profesores = User::where('rol', User::PROFESOR)->get();
        $totalProfesores = $profesores->count();

        // Si no hay profesores, salir
        if ($totalProfesores === 0) {
            return;
        }

        // Asignar profesores a clases
        $todasClases = Clase::all();

        foreach ($todasClases as $clase) {
            // Determinar cuántos profesores asignar (1 o 2, dependiendo de los disponibles)
            $numeroProfesores = min(rand(1, 2), $totalProfesores);

            // Seleccionar profesores aleatorios
            $profesoresAsignar = $profesores->random($numeroProfesores);

            foreach ($profesoresAsignar as $profesor) {
                DB::table('clase_profesor')->insert([
                    'clase_id' => $clase->id,
                    'profesor_id' => $profesor->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        } */
    }
}