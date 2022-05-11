<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'c_name'=>'required',
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
            $category = new Category;
            $category->c_name = $request->input('c_name');
            $category->status = $request->input('status') == true ? '1':'0';
            $category->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Category Added Successfully',
            ]);
        }
    }

    public function view()
    {
        $category = Category::all();
        return response()->json([
            'status'=> 200,
            'Category'=> $category,
        ]);
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if($category){
            return response()->json([
                'status'=> 200,
                'Category'=> $category,
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Category not found',
            ]);
        }
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'c_name'=>'required',
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
            $category = Category::find($id);
            $category->c_name = $request->input('c_name');
            $category->status = $request->input('status');
            $category->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Category Updated Successfully',
            ]);
        }
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if($category){
            $category->delete();
            return response()->json([
                'status'=> 200,
                'massage'=>'Category deleted successfully',
            ]);
        }
        else{
            return response()->json([
                'massage'=>'Category not found',
            ]);
        }
    }

    public function activecat()
    {
        $category = Category::where('status',1)->get();
        return response()->json([
            'status'=> 200,
            'Category'=> $category,
        ]);
    }
}
