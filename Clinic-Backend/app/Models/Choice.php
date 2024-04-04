<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;
    protected $fillable = ["content", "score"];
    public function multiChoiceQuestion(){
        return $this->belongsTo(MultiChoiceQuestion::class);
    }
    public function users(){
        return $this->belongsToMany(User::class, "multi_choice_answer");
    }
}
