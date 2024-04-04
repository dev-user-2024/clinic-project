<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescriptiveQuestion extends Model
{
    use HasFactory;
    protected $fillable = ["content"];
    public function quizable(){
        return $this->morphTo();
    }
//    public function quiz(){
//        return $this->belongsTo(DescriptiveQuiz::class, "descriptive_quiz_id");
//    }
    public function users(){
        return $this->belongsToMany(User::class, "descriptive_question_answer")->withPivot("content", "file");
    }
}
