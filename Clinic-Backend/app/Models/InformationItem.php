<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationItem extends Model
{
    use HasFactory;
    protected $fillable = ["title", "file", "description"];
    public function informationCategory(){
        return $this->belongsTo(InformationCategory::class);
    }

}
