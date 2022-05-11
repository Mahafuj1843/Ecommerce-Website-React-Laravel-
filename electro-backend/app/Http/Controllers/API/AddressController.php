<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use DB;
use Illuminate\Support\Facades\Validator;

class AddressController extends Controller
{
    public function add(Request $request, $u_id)
    {
        $validator = Validator::make($request->all(), [
            'u_id'=>'required',
            'fullname'=>'required',
            'phone'=>'required|min:11|max:11',
            'street_address'=>'required',
            'village'=>'required',
            'state'=>'required',
            'city'=>'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            if(Address::where('u_id', $u_id)->doesntExist()){
                DB::table('addresses')->insert([
                    'u_id' => $u_id,
                    'fullname' => $request->input('fullname'),
                    'phone' => $request->input('phone'),
                    'street_address' => $request->input('street_address'),
                    'village' => $request->input('village'),
                    'state' => $request->input('state'),
                    'city' => $request->input('city'),
                ]);

                return response()->json([
                    'status'=> 200,
                    'massage'=>'Address added',
                ]);
            }
            else{
                DB::table('addresses')->where('u_id',$u_id)->update([
                    'fullname' => $request->input('fullname'),
                    'phone' => $request->input('phone'),
                    'street_address' => $request->input('street_address'),
                    'village' => $request->input('village'),
                    'state' => $request->input('state'),
                    'city' => $request->input('city'),
                ]);

                return response()->json([
                    'status'=> 200,
                    'massage'=>'Address updated',
                ]);
            }
        }
    }
    public function show($u_id)
    {
        $address = Address::where('u_id', $u_id)->get();
        return response()->json([
            'status'=> 200,
            'Address'=> $address,
        ]);
    }
}
