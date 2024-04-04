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
        Schema::create('level_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\MultiChoiceQuiz::class)->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->float('min_val');
            $table->float('max_val');
            $table->text('content');
            $table->longText("file");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('level_scores');
    }
};
