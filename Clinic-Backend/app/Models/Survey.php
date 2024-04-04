<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;
    protected $fillable = ["title"];
    public function diseases(){
        return $this->belongsToMany(Disease::class, "disease_survey");
    }
    public function descriptiveQuestions(){
        return $this->morphMany(DescriptiveQuestion::class, "quizable");
    }
    public function multiChoiceQuestions(){
        return $this->hasMany(MultiChoiceSurveyQuestion::class);
    }
    public function users(){
        return $this->belongsToMany(User::class, "user_survey");
    }
}
