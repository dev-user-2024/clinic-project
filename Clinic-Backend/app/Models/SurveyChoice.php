<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyChoice extends Model
{
    use HasFactory;
    protected $fillable = ["content"];
    public function users(){
        return $this->belongsToMany(User::class, "survey_multi_choice_answer");
    }
    public function multiChoiceSurveyQuestion(){
        return $this->belongsTo(MultiChoiceSurveyQuestion::class);
    }
}
