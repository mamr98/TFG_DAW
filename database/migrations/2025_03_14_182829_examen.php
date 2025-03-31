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
            $table->string('asignatura');
            $table->integer('preguntas');
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('id_imagenAComparar');
            $table->unsignedBigInteger('id_imagenCorrecta');
            $table->dateTime('fecha_subida');
            $table->string('codigo');
            $table->timestamps();

            $table->foreign('idUsuario')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_imagenAComparar')->references('id')->on('respuestas_alumnos')->onDelete('cascade');
            $table->foreign('id_imagenCorrecta')->references('id')->on('respuestas_maestras')->onDelete('cascade');
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
