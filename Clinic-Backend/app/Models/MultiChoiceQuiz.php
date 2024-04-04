<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MultiChoiceQuiz extends Model
{
    use HasFactory;
    protected $fillable = ["title", 'question_quantity', 'start_at', 'end_at'];
    public function diseases(){
        return $this->belongsToMany(Disease::class, "multi_choice_quiz_disease");
    }
    public function multiChoiceQuestions(){
        return $this->morphMany(MultiChoiceQuestion::class, 'quizable');
    }
    public function levelScores(){
        return $this->hasMany(LevelScore::class);
    }
    public function users(){
        return $this->belongsToMany(User::class, "multi_choice_quiz_user");
    }
}
