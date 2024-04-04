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
        Schema::create('face_to_face_visits', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class, "patient")->nullable()->constrained("users")->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignIdFor(\App\Models\User::class, "doctor")->nullable()->constrained("users")->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignIdFor(\App\Models\Disease::class)->nullable()->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string("full_name");
            $table->text("address");
            $table->text("description");
            $table->dateTime("visit");
            $table->string("phone_number");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('face_to_face_visits');
    }
};
