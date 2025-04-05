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

        // Obtener todos los profesores disponibles (role_id = 2)
        $profesores = DB::table('model_has_roles')
            ->where('role_id', 2)
            ->pluck('model_id'); // Obtenemos solo los IDs de los usuarios

        // Si no hay profesores, salir
        if ($profesores->isEmpty()) {
            return;
        }

        // Asignar profesores a clases
        $todasClases = Clase::all();

        foreach ($todasClases as $clase) {
            // Determinar cuántos profesores asignar (1 o 2, dependiendo de los disponibles)
            $numeroProfesores = min(rand(1, 2), $profesores->count());

            // Seleccionar profesores aleatorios
            $profesoresAsignar = $profesores->random($numeroProfesores);

            foreach ($profesoresAsignar as $profesorId) {
                DB::table('clase_profesor')->insert([
                    'clase_id' => $clase->id,
                    'profesor_id' => $profesorId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }


        // Obtener todos los alumnos disponibles (role_id = 2)
        $alumnos = DB::table('model_has_roles')
            ->where('role_id', 3)
            ->pluck('model_id'); // Obtenemos solo los IDs de los usuarios

        // Si no hay alumnos, salir
        if ($alumnos->isEmpty()) {
            return;
        }

        // Asignar alumnos a clases
        $todasClases = Clase::all();

        foreach ($todasClases as $clase) {
            // Determinar cuántos alumnos asignar (1 o 2, dependiendo de los disponibles)
            $numeroalumnos = min(rand(1, 2), $alumnos->count());

            // Seleccionar profesores aleatorios
            $alumnosAsignar = $alumnos->random($numeroalumnos);

            foreach ($alumnosAsignar as $alumnoId) {
                DB::table('clase_alumno')->insert([
                    'clase_id' => $clase->id,
                    'alumno_id' => $alumnoId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}