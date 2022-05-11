<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Laravel\Sanctum\SanctumServiceProvider;
use Illuminate\Http\Request;
use Auth;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    public function addToCart(Request $request){

        if(auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_price = $request->product_price;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck->quantity >= $product_qty){
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json([
                        'status'=>403,
                        'massage'=> $productCheck->name.' Already Added to Cart'
                    ]);
                }else{
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_price = $product_price;
                    $cartItem->qty = $product_qty;
                    $cartItem->save();

                    return response()->json([
                        'status'=>200,
                        'massage'=> 'Added to Cart'
                    ]);
                }

            }else{
                return response()->json([
                    'status'=>402,
                    'massage'=> $productCheck->name.' '.$productCheck->quantity.'item in stock'
                ]);
            }
        }
        else{
            return response()->json([
                'status'=>401,
                'massage'=>'Login to Add to Cart'
            ]);
            
        }
    } 

    public function cartCount(Request $request){
        $user_id = auth('sanctum')->user()->id;
        $result = Cart::where('user_id', $user_id)->count();
        return $result;
      }

      public function cartItemList(Request $request){
        $user_id = auth('sanctum')->user()->id;
        $result = Cart::where('user_id', $user_id)->get();

        $cartItem = [];
                foreach($result as $item){
                    $cartItem[] = [
                        'id'=> $item->id,
                        'image'=> $item->product->image,
                        'product_name'=> $item->product->name,
                        'price'=> $item->product_price,
                        'quantity'=> $item->qty,
                        'total'=> $item->product_price * $item->qty,
                    ];
                }
        
        if($cartItem)
        {
            return response()->json([
                'status'=> 200,
                'CartItem'=> $cartItem,
            ]);
        }else{
            return response()->json([
                'status'=> 401,
                'massage'=> 'Cart Empty',
            ]);
        }
    }

    public function CartItemPlus(Request $request){
        $id = $request->id;
        $result = Cart::where('id', $id)->first();

        $quantity = $result->qty;
        $price = $result->product_price;
        $newQuantity = $quantity+1;
        $total_price = $newQuantity*$price;
        $ans = $result->update(['qty' =>$newQuantity]);

        return $ans;
   } 

       public function CartItemMinus(Request $request){
        $id = $request->id;
        $result = Cart::where('id', $id)->first();

        $quantity = $result->qty;
        $price = $result->product_price;
      
        if($quantity<=1){
           $newQuantity=1;  
        }
        else{
             $newQuantity = $quantity-1;
        }
        $total_price = $newQuantity*$price;
        $ans = $result->update(['qty' =>$newQuantity]);

        return $ans;
   }

   public function RemoveCartList(Request $request){
    $id = $request->id;
    $result = Cart::where('id',$id)->delete();
    return $result;
   }

}
