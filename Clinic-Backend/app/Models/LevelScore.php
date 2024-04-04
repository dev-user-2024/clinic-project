<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LevelScore extends Model
{
    use HasFactory;
    protected $fillable = ["min_val", "max_val", "content", "file", "multi_choice_quiz_id"];
    public function multiChoiceQuiz(){
        return $this->belongsTo(MultiChoiceQuiz::class);
    }
}
