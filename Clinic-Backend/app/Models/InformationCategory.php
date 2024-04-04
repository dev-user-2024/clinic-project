<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationCategory extends Model
{
    use HasFactory;
    protected $fillable = ["title", "image"];

    public function informationItems(){
        return $this->hasMany(InformationItem::class);
    }
    public function disease(){
        return $this->belongsTo(Disease::class);
    }
}
