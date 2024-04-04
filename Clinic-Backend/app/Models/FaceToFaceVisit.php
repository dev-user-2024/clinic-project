<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaceToFaceVisit extends Model
{
    use HasFactory;
    protected $fillable = ['full_name', 'description', "phone_number", "visit", "address", "doctor", "patient", "disease_id"];
    public function patients(){
        return $this->belongsTo(User::class, "patient");
    }
    public function doctor(){
        return $this->belongsTo(User::class, "doctor");
    }
    public function disease(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Disease::class);
    }
}
