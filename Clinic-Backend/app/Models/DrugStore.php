<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DrugStore extends Model
{
    use HasFactory;
    protected $casts = [
        'latitude' => 'double',
        "longitude" => "double"
    ];
    public function diseases(){
        return $this->belongsToMany(Disease::class, "drug_store_disease");
    }
    public function drugs(){
        return $this->belongsToMany(Drug::class, "drug_drug_store")->withPivot("possess");
    }
}
