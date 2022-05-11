<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductReview;
// use Illuminate\Support\Facades\Validator;

class productReviewController extends Controller
{
    public function ReviewList(Request $request){
 
        $product_id = $request->product_id;
            $result = ProductReview::where('product_id',$product_id)->orderBy('ratting','desc')->limit(4)->get();
            return response()->json([
                'status'=> 401,
                'Review'=> $result
            ]);
    } 
}
