<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ["title", "file", "description"];
    public function categoryLifeSkill(){
        return $this->belongsTo(CategoryLifeSkill::class, "category_life_skill_id");
    }
}
