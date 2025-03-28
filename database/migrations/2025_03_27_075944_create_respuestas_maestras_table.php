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
        // database/migrations/xxxx_create_respuestas_maestras_table.php
        Schema::create('respuestas_maestras', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('examen_id'); // Relación con el examen
            $table->unsignedBigInteger('user_id'); // Relación con el usuario
            $table->integer('fila'); // Número de fila (ej: 1, 2, 3...)
            $table->string('columna', 1); // Letra de columna (A, B, C, D)
            $table->string('imagenCorrecta')->nullable(); // Ruta de la imagen de referencia (opcional)
            $table->timestamps();

            // Clave foránea
            $table->foreign('examen_id')
                ->references('id')
                ->on('examen')
                ->onDelete('cascade'); // Si se borra el examen, se borran sus respuestas

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');// Si se borra el examen, se borran sus respuestas
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respuesta_maestras');
    }
};
