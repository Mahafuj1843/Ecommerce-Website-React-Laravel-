<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use DB;
//use Illuminate\Support\Facades\Hash;
use Mail;
use App\Mail\ForgetMail;

class PasswordController extends Controller
{
    public function forgetPassword(Request $request)
    {
        $email = $request->email;
 
        if (User::where('email',$email)->doesntExist()) {
        return response([
            'message' => 'Email Invalid'
        ],401);
        }
        //generate Randome Token
        $token=rand(10,100000);

        try{
            DB::table('password_resets')->insert([
                'email'=>$email,
                'token'=> $token
            ]);

            //Sending mail to user
            Mail::to($email)->send(new ForgetMail($token));
            return response ([
                'message'=> 'Password Reset  Mail send on your email'
            ],200);


        }catch(Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ],400);
        }
    }
    
    public function resetPassword(Request $request)
    {
        $email =$request ->email;
        $token = $request ->token;
        $password = Hash::make($request ->password);
 
        $emailcheck =DB::table('password_resets')->where('email',$email)->first();
        $pincheck=DB::table('password_resets')->where ('token',$token)->first();
 
        if (!$emailcheck) {
    		return response([
    			'message' => "Email Not Found"
    		],401);    	 	 
    	 }
    	 if (!$pincheck) {
    		return response([
    			'message' => "Pin Code Invalid"
    		],401);    	 	 
    	 }
 
         DB::table('users')->where('email',$email)->update(['password' => $password]);
    	 DB::table('password_resets')->where('email',$email)->delete();
 
    	 return response([
    	 	'message' => 'Password Change Successfully'
    	 ],200);
    }

    public function chancePassword(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'current_password'=>'required|min:6',
            'new_password'=>'required|min:6',  
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        }else{
            $user = User::find($id);

            if (! Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status'=> 201,
                    'massage'=>'Current Password does not match',
                ]);
            }else{
                $user->password = Hash::make($request->input('new_password'));
                $user->save();
                return response()->json([
                    'status'=> 200,
                    'massage'=>'Password Changed Successful',
                ]);
            }
        }
    }
}
