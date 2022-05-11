<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_token')->plainTextToken;

            return response()->json([
                'status'=> 200,
                'userid'=>$user->id,
                'username'=>$user->name,
                'token'=>$token,
                'massage'=>'Registration Successfull',
             ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=> 201,
                    'massage'=>'Invalid Email and Password',
                ]);
            }
            else{
                $token = $user->createToken($user->email.'_token')->plainTextToken;

                return response()->json([
                    'status'=> 200,
                    'userid'=>$user->id,
                    'username'=>$user->name,
                    'role_as'=>$user->role_as,
                    'token'=>$token,
                    'massage'=>'Login Successfull',
                ]);
            }
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=> 200,
            'massage'=>'Logout Successfull',
        ]);
    }
    
    public function profile($id){
        $user = User::where('id', $id)->get();
        return response()->json([
            'status'=> 200,
            'user'=> $user,
        ]);
    }

    public function view()
    {
        $user = User::all();
        return response()->json([
            'status'=> 200,
            'User'=> $user,
        ]);
    }

    public function edit($id)
    {
        $user = User::find($id);
        if($user){
            return response()->json([
                'status'=> 200,
                'u_id'=> $user->id,
                'role'=> $user->role_as,
            ]);
        }
        else{
            return response()->json([
                'massage'=>'User not found',
            ]);
        }
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'role_as'=>'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $user = User::find($id);
            $user->role_as = $request->input('role_as');
            $user->save();

            return response()->json([
                'status'=> 200,
                'massage'=>'Role Updated Successfully',
            ]);
        }
    }

    public function delete($id)
    {
        $user = User::find($id);
        if($user){
            $user->delete();
            return response()->json([
                'status'=> 200,
                'massage'=>'User deleted successfully',
            ]);
        }
        else{
            return response()->json([
                'massage'=>'User not found',
            ]);
        }
    }
}
