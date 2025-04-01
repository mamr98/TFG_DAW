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
        Schema::create('clase', function (Blueprint $table) {
            $table->id();
            $table->string('curso');
            $table->string('promocion');
            $table->unsignedBigInteger('id_alumno'); // Relación con el alumno
            $table->unsignedBigInteger('id_profesor'); // Relación con el profesor
            $table->timestamps();

            // Claves foráneas
            $table->foreign('id_alumno')->references('id')->on('alumno')->onDelete('cascade');
            $table->foreign('id_profesor')->references('id')->on('profesor')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clase');
    }
};
