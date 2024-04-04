<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescriptiveQuiz extends Model
{
    use HasFactory;
    protected $fillable = ["title", "start_at", "end_at"];
    public function diseases(){
        return $this->belongsToMany(Disease::class, "descriptive_quiz_disease");
    }
    public function multiChoiceQuestions(){
        return $this->morphMany(MultiChoiceQuestion::class, "quizable");
    }
    public function descriptiveQuestions(){
        return $this->morphMany(DescriptiveQuestion::class, "quizable");
    }
    public function usersResults(){
        return $this->belongsToMany(User::class, "descriptive_quiz_result")->withPivot(["file", "content"]);
    }
}
