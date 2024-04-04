<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryTicket extends Model
{
    use HasFactory;
    protected $fillable = ["content"];
    public function tickets(){
        return $this->hasMany(Ticket::class);
    }

}
