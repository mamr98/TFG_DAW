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
        Schema::create('nota', function (Blueprint $table) {
            $table->id();
            $table->string('comentario');
            $table->string('nota');
            $table->unsignedBigInteger('id_alumno');
            $table->unsignedBigInteger('idExamen');
            $table->timestamps();

            $table->foreign('id_alumno')->references('id')->on('alumno');
            $table->foreign('idExamen')->references('id')->on('examen');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
