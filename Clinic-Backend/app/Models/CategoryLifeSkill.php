<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryLifeSkill extends Model
{
    use HasFactory;
    protected $fillable = ["title", "image"];
    public function items(){
        return $this->hasMany(Item::class);
    }
    public function disease(){
        return $this->belongsTo(Disease::class);
    }
}
