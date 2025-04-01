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
        Schema::create('examen_clase', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_examen'); // Relación con el alumno
            $table->unsignedBigInteger('id_clase'); // Relación con el profesor
            $table->date('fecha');
            $table->timestamps();

            // Claves foráneas
            $table->foreign('id_examen')->references('id')->on('examen')->onDelete('cascade');
            $table->foreign('id_clase')->references('id')->on('clase')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examen_clase');
    }
};
