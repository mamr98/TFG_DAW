<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('respuestas_alumnos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('examen_id'); // Relación con el examen
            $table->unsignedBigInteger('user_id'); // Relación con el alumno
            $table->integer('fila'); // Número de fila (ej: 1, 2, 3...)
            $table->string('columna', 1); // Letra marcada por el alumno (A, B, C, D)
            $table->string('imagenAComparar')->nullable(); // Ruta de la imagen subida por el alumno (opcional)
            $table->timestamps();
        
            // Claves foráneas
            $table->foreign('examen_id')
                  ->references('id')
                  ->on('examen')
                  ->onDelete('cascade');
        
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respuesta_alumnos');
    }
};
