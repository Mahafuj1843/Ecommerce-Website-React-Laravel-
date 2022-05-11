<?php

namespace App\Http\Controllers\API;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Carbon;
// use Carbon\Carbon;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\Shipping;
use App\Models\Transaction;

class OrderController extends Controller
{
    public function placeOrder(Request $request){
        $user_id = auth('sanctum')->user()->id;
         if(auth('sanctum')->check()){
            $validator = Validator::make($request->all(), [
                'firstname'=>'required',
                'lastname'=>'required',
                'phone'=>'required',
                'street_address'=>'required',
                'village'=>'required',
                'state'=>'required',
                'city'=>'required',
                'paymentType'=>'required',
                'accountNo'=>'required',
                'amount'=>'required',
                'transactionID'=>'required',
            ]);
    
            if ($validator->fails())
            {
                return response()->json([
                    'validation_errors'=>$validator->messages(),
                ]);
            }
            else
            {
                $cart = Cart::where('user_id', $user_id)->get();
                $subtotal = 0;
                foreach($cart as $item){
                    $subtotal += ($item->product_price * $item->qty);
                }

                $order = new Order;
                $order->user_id = $user_id;
                $order->subtotal = $subtotal;
                $order->discount = 0;
                $order->tax = 60;
                $order->total = $subtotal + 60;
                $order->order_date = Carbon::now()->format('d-m-Y');
                $order->status = '0';
                $order->save();
    
                $orderitems = [];
                foreach($cart as $item){
                    $orderitems[] = [
                        'order_id'=> $order->id,
                        'product_id'=> $item->product_id,
                        'price'=> $item->product_price,
                        'quantity'=> $item->qty,
                        'total'=> $item->product_price * $item->qty
                    ];

                    $item->product->update([
                        'quantity'=> $item->product->quantity - $item->qty
                    ]);
                }
                $order->orderItem()->createMany($orderitems);
                Cart::destroy($cart);

                $shipping = new Shipping;
                $shipping->order_id = $order->id;
                $shipping->firstname = $request->input('firstname');
                $shipping->lastname = $request->input('lastname');
                $shipping->phone = $request->input('phone');
                $shipping->street_address = $request->input('street_address');
                $shipping->village = $request->input('village');
                $shipping->state= $request->input('state');
                $shipping->city = $request->input('city');
                $shipping->save();

                $transaction = new Transaction;
                $transaction->user_id = $user_id;
                $transaction->order_id = $order->id;
                $transaction->payment_type = $request->input('paymentType');
                $transaction->account_no = $request->input('accountNo');
                $transaction->amount = $request->input('amount');
                $transaction->transactions_id  = $request->input('transactionID');
                $transaction->save();

                return response()->json([
                    'status'=> 200,
                    'massage'=>'Order Done Successfully',
                ]);
            }
        }else{
            return response()->json([
                'status'=> 402,
                'massage'=>'Login to Place Order',
            ]);
        }
    }

    public function AllOrder(){
        $order = Order::orderBy('status', 'asc')->get();

        $allOrder = [];
                foreach($order as $item){
                    $allOrder[] = [
                        'order_id'=> $item->id,
                        'subtotal'=> $item->subtotal,
                        'tax'=> $item->tax,
                        'total'=> $item->total,
                        'status'=> $item->status,
                        'username'=> $item->user->name,
                        'email'=> $item->user->email,
                        'mobile'=> $item->shipping->phone,
                        'order_date'=> $item->order_date,
                        'delivery_date'=> $item->delivery_date
                    ];
                }

        if($allOrder){
            return response()->json([
                'status'=> 200,
                'Order'=> $allOrder,
            ]);
        }else{
            return response()->json([
                'status'=> 401,
                'Order'=> 'No Order Done Yet',
            ]);
        }
    }

    public function  updateOrderStatus(Request $request){

        $order_id = $request->order_id;
        $status = $request->status;

        $order = Order::find($order_id);
        if($status == 2){
            $dt = Carbon::now()->addDay(5)->format('d-m-Y');
            $order->update([
                'status'=> $status,
                'delivery_date'=> $dt
            ]);
        }else{
            $order->update([
                'status'=> $status
            ]);
        }

        return response()->json([
            'status'=> 200,
            'massage'=> 'Order Status Change Successfully',
        ]);
    }

    public function customerAllOrder(){
        $user_id = auth('sanctum')->user()->id;
        $order = Order::where('user_id', $user_id)->get();

        if($order){
            return response()->json([
                'status'=> 200,
                'Order'=> $order,
            ]);
        }else{
            return response()->json([
                'status'=> 401,
                'Order'=> 'No Order Done Yet',
            ]);
        }
    }

    public function orderDetails($order_id){
        $user_id = auth('sanctum')->user()->id;
        $result = OrderItem::where('order_id', $order_id)->get();

        $orderItem = [];
                foreach($result as $item){
                    $orderItem[] = [
                        'product_id'=> $item->product->id,
                        'product_image'=> $item->product->image,
                        'product_name'=> $item->product->name,
                        'price'=> $item->price,
                        'quantity'=> $item->quantity,
                        'total'=> $item->total,
                    ];
                }

        $shipping = Shipping::where('order_id', $order_id)->first();
        $transaction = Transaction::where('order_id', $order_id)->first();

        return response()->json([
            'status'=> 200,
            'OrderItem'=> $orderItem,
            'Shipping'=> $shipping,
            'Transaction'=> $transaction,
        ]);
    }
}
