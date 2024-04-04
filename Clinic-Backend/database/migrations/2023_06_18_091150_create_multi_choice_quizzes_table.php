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
        Schema::create('multi_choice_quizzes', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->unsignedInteger("question_quantity");
            $table->timestamp("start_at");
            $table->timestamp("end_at");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multi_choice_quizzes');
    }
};
