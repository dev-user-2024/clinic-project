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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->longText('image')->nullable();
            $table->enum('sex', ["male", "female", "other"])->nullable();
            $table->string('email')->nullable();
            $table->timestamp('birthDay')->nullable();
            $table->string('mobile')->unique();
            $table->string("nationality_id")->nullable();
            $table->string("password")->nullable();
            $table->boolean("approved")->default(false);
            $table->foreignIdFor(\App\Models\Role::class)->nullable()->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string("OTP")->nullable();
            $table->string("OTP_created")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
