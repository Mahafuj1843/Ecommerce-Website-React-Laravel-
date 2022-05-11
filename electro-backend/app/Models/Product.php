<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'description',
        'original_price',
        'selling_price',
        'image',
        'quantity',
        'c_id',
        'b_id',
    ];

    public function productReview(){
        return $this->hasMany(ProductReview::class);
    }

    public $timestamps = true;
}
