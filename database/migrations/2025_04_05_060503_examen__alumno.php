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
        Schema::create('examen_alumno', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_id')->constrained('users');
            $table->foreignId('examen_id')->constrained('examen');
            $table->dateTime('fecha_subida')->nullable();
            $table->string('fichero_alumno')->nullable();
            $table->json('json_alumno')->nullable();
            $table->decimal('nota', 5, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examen_alumno');
    }
};
