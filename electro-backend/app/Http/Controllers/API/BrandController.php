<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'b_name'=>'required',
            'c_id'=>'required',
            'status'=>'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $brand = new Brand;
            $brand->b_name = $request->input('b_name');
            $brand->c_id = $request->input('c_id');
            $brand->status = $request->input('status');
            $brand->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Brand Added Successfully',
            ]);
        }
    }

    public function view($cat_id)
    {
        $brand = Brand::where('c_id', $cat_id)->get();
        return response()->json([
            'status'=> 200,
            'Brand'=> $brand,
        ]);
    }

    public function edit($id)
    {
        $brand = Brand::find($id);
        if($brand){
            return response()->json([
                'status'=> 200,
                'Brand'=> $brand,
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Brand not found',
            ]);
        }
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'b_name'=>'required',
            'c_id'=>'required',
            'status'=>'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $brand = Brand::find($id);
            $brand->b_name = $request->input('b_name');
            $brand->c_id = $request->input('c_id');
            $brand->status = $request->input('status');
            $brand->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Brand Updated Successfully',
            ]);
        }
    }

    public function delete($id)
    {
        $brand = Brand::find($id);
        if($brand){
            $brand->delete();
            return response()->json([
                'status'=> 200,
                'massage'=>'Brand deleted successfully',
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Brand not found',
            ]);
        }
    }

    public function activeBrand($c_id)
    {
        $brand = Brand::where('status', 1)->where('c_id', $c_id)->get();
        return response()->json([
            'status'=> 200,
            'Brand'=> $brand,
        ]);
    }
}
