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
        Schema::create('profesor', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role',['profesor'])->default('profesor');
            $table->enum('estado', ['confirmado', 'no_confirmado'])->default('no_confirmado');
            $table->rememberToken();
            $table->timestamps();
        });

        /* Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('profesor_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('profesor_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        }); */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profesor');
        /* Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions'); */
    }
};
