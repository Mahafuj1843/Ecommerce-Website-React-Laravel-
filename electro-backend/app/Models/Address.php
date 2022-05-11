<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = 'addresses';
    
    public function order(){
        return $this->belongsTo(Order::class);
    }

    protected $fillable = [
        'u_id',
        'fullname',
        'phone',
        'street_address',
        'village',
        'state',
        'city',
    ];

    public $timestamps = true;
}
