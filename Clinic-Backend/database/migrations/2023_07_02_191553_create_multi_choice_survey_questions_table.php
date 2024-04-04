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
        Schema::create('multi_choice_survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Survey::class)->nullable()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->text("content");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multi_choice_survey_questions');
    }
};
