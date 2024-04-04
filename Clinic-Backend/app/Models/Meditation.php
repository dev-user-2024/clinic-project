<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meditation extends Model
{
    use HasFactory;
    protected $fillable = ['description', "file", 'title', 'type'];
    public function diseases(){
        return $this->belongsToMany(Disease::class, "meditation_disease");
    }
}
