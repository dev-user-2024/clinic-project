<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = ["title"];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function categoryTicket(){
        return $this->belongsTo(CategoryTicket::class);
    }
    public function messages(){
        return $this->hasMany(Message::class);
    }
}
