<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MultiChoiceQuestion extends Model
{
    use HasFactory;
    protected $fillable = ["content"];
    public function quizable(){
        return $this->morphTo();
    }
    public function choices(){
        return $this->hasMany(Choice::class);
    }
}
