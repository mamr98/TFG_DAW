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
            $table->string('nombre');
            $table->integer('preguntas');
            $table->string('asignatura');
            $table->string('imagenCorrecta')->nullable();
            //$table->string('imagenAComparar');
            $table->unsignedBigInteger('idUsuario');
            $table->dateTime('fecha_subida');
            $table->timestamps();

            $table->foreign('idUsuario')->references('id')->on('users')->onDelete('cascade');
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
