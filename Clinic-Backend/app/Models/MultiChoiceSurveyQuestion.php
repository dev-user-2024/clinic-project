<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MultiChoiceSurveyQuestion extends Model
{
    use HasFactory;
    protected $fillable = ["content"];
    public function survey(){
        return $this->belongsTo(Survey::class);
    }
    public function choices(){
        return $this->hasMany(SurveyChoice::class);
    }

}
