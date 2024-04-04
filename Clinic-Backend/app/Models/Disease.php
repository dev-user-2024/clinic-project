<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;
    public function entertainments(){
        return $this->belongsToMany(Entertainment::class, "entertainment_disease");
    }
    public function visits(){
        return $this->hasMany(FaceToFaceVisit::class);
    }
    public function  drugStores(){
        return $this->belongsToMany(DrugStore::class, "drug_store_disease");
    }
    public function drugs(){
        return $this->belongsToMany(Drug::class, "drug_disease");
    }
    public function multiChoiceQuizzez(){
        return $this->belongsToMany(MultiChoiceQuiz::class, "multi_choice_quiz_disease");
    }
    public function descriptiveQuizzes(){
        return $this->belongsToMany(DescriptiveQuiz::class, "descriptive_quiz_disease");
    }
    public function survies(){
        return $this->belongsToMany(Survey::class, "disease_survey");
    }
    public function categoryLifeSkills(){
        return $this->hasMany(CategoryLifeSkill::class);
    }
    public function informationCategory(){
        return $this->hasMany(InformationCategory::class);
    }
    public function meditations(){
        return $this->belongsToMany(Meditation::class, "meditation_disease");
    }
}
