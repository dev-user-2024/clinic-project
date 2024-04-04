<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    use HasFactory;
    protected $fillable = ["name"];
    public function drugStores(){
        return $this->belongsToMany(DrugStore::class, "drug_drug_store")->withPivot("possess");
    }
    public function diseases(){
        return $this->belongsToMany(Disease::class, "drug_disease");
    }
}
