<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use DB;

class ProductController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'original_price' => 'required',
            'selling_price' =>'required',
            'image' => 'required|image|mimes:jpg,png,jpeg,webp',
            'quantity' => 'required',
            'c_id' => 'required',
            'b_id' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $product = new Product;
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->original_price = $request->input('original_price');
            $product->selling_price = $request->input('selling_price');
            if($request->hasfile('image')){
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = $request->input('name').'.'.$ext;
                $file->move('upload/product/', $filename);
                $product->image = 'upload/product/'.$filename;
            }
            $product->quantity = $request->input('quantity');
            $product->c_id = $request->input('c_id');
            $product->b_id = $request->input('b_id');
            $product->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Product Added Successfully',
            ]);
        }
    }

    public function edit($id){
        $product = Product::find($id);
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'original_price' => 'required',
            'selling_price' =>'required',
            'image' => 'required',
            'quantity' => 'required',
            'c_id' => 'required',
            'b_id' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $product= Product::find($id);
            $product->name = $request->input('name');
            $product->description = $request->input('description');
            $product->original_price = $request->input('original_price');
            $product->selling_price = $request->input('selling_price');
            if($request->hasfile('image')){
                $dest = 'upload/product/'.$product->image;
                if(File::exists($dest)){
                    File::delete($dest);
                }
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = $request->input('name').'.'.$ext;
                $file->move('upload/product/', $filename);
                $product->image = 'upload/product/'.$filename;
            }
            $product->quantity = $request->input('quantity');
            $product->c_id = $request->input('c_id');
            $product->b_id = $request->input('b_id');
            $product->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Product Updated Successfully',
            ]);
        }
    }

    public function delete($id)
    {
       $product = Product::find($id);
       if($product)
       {
            $dest = 'upload/product/'.$product->image;
            if(File::exists($dest)){
                File::delete($dest);
            }
            $product->delete();
            return response()->json([
                'status'=> 200,
                'massage'=>'Product deleted successfully',
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }

    public function view($cat_id, $b_id){
        $product = Product::where('c_id', $cat_id)->where('b_id', $b_id)->get();
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }

    public function viewProduct(){
        $product = DB::table('products')
                ->orderBy('c_id', 'asc')
                ->get();
        // $product = Product::orderBy('c_id')->all();
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }
    
    public function productDetails($id){
        $product = Product::where('id', $id)->first();
        // $product = Product::orderBy('c_id')->all();
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }

    public function viewByCategoryId($c_id){
        $product = Product::where('c_id', $c_id)->get();
        // $product = Product::orderBy('c_id')->all();
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }

    public function search($key)
    {
        $product = Product::where('name','LIKE',"%$key%")->get();
        if($product){
            return response()->json([
                'status'=> 200,
                'Product'=> $product,
            ]);
        }else{
            return response()->json([
                'massage'=>'Product not found',
            ]);
        }
    }
}
