<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $table = 'shippings';

    protected $fillable = [
        'order_id',
        'firstname',
        'lastname',
        'phone',
        'street_address',
        'village',
        'state',
        'city'
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }
    public $timestamps = true;
}
