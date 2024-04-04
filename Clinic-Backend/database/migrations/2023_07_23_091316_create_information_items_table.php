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
        Schema::create('information_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\InformationCategory::class)->nullable()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string("title");
            $table->text("description");
            $table->longText('file');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('information_items');
    }
};
