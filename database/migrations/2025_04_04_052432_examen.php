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
        Schema::create('examen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profesor_id')->constrained('users');
            $table->dateTime('fecha_subida');
            $table->foreignId('clase_id')->constrained('clase');
            $table->foreignId('asignatura_id')->constrained('asignatura');
            $table->string('fichero_profesor')->nullable();
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');
            $table->string('nombre_examen');
            $table->json('json_examen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examen');
    }
};
