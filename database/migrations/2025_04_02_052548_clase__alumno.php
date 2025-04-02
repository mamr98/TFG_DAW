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
        Schema::create('clase_alumno', function (Blueprint $table) {
            $table->foreignId('alumno_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('clase_id')->constrained('clase')->onDelete('cascade');
            $table->primary(['alumno_id', 'clase_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clase_alumno');
    }
};
