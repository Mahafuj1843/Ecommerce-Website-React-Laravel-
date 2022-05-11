<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'carts';
    
    // public function order(){
    //     return $this->belongsTo(Order::class);
    // }

    protected $fillable = [
        'user_id',
        'product_id',
        'product_price',
        'qty',
        // 'total_price'
    ];
    protected $with = ['product'];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
