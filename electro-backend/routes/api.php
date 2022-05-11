<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\PasswordController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\productReviewController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('user-profile-{id}', [AuthController::class, 'profile']);
Route::get('all-user', [AuthController::class, 'view']);
Route::get('edit-role-{id}', [AuthController::class, 'edit']);
Route::post('update-role-{id}', [AuthController::class, 'update']);
Route::delete('delete-user-{id}', [AuthController::class, 'delete']);

Route::post('forget-password', [PasswordController::class, 'forgetPassword']);
Route::post('reset-password', [PasswordController::class, 'resetPassword']);
Route::post('change-password-{id}', [PasswordController::class, 'chancePassword']);

Route::post('user-address-{u_id}', [AddressController::class, 'add']);
Route::get('view-address-{u_id}', [AddressController::class, 'show']);


Route::middleware(['auth:sanctum'])->group(function () {
   Route::post('logout', [AuthController::class, 'logout']);
});

//category
Route::post('add-category', [CategoryController::class, 'add']);
Route::get('view-category', [CategoryController::class, 'view']);
Route::get('edit-category-{id}', [CategoryController::class, 'edit']);
Route::post('update-category-{id}', [CategoryController::class, 'update']);
Route::delete('delete-category-{id}', [CategoryController::class, 'delete']);
Route::get('active-category', [CategoryController::class, 'activecat']);

//Brand
Route::post('add-brand', [BrandController::class, 'add']);
Route::get('view-brand-{cat_id}', [BrandController::class, 'view']);
Route::get('edit-brand-{id}', [BrandController::class, 'edit']);
Route::post('update-brand-{id}', [BrandController::class, 'update']);
Route::delete('delete-brand-{id}', [BrandController::class, 'delete']);
Route::get('active-brand-{c_id}', [BrandController::class, 'activeBrand']);

//Product
Route::post('add-product', [ProductController::class, 'add']);
Route::get('view-product-{cat_id}-{b_id}', [ProductController::class, 'view']);
Route::get('view-product', [ProductController::class, 'viewProduct']);
Route::get('view-product-{c_id}', [ProductController::class, 'viewByCategoryId']);
Route::get('product-details-{id}', [ProductController::class, 'productDetails']);
Route::get('edit-product-{id}', [ProductController::class, 'edit']);
Route::post('update-product-{id}', [ProductController::class, 'update']);
Route::delete('delete-product-{id}', [ProductController::class, 'delete']);
Route::get('search-product-{key}', [ProductController::class, 'search']);
//Cart
Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('cart-count', [CartController::class, 'cartCount']);
Route::get('cart-item', [CartController::class, 'cartItemList']);
Route::post('cart-item-plus', [CartController::class, 'CartItemPlus']);
Route::post('cart-item-minus', [CartController::class, 'CartItemMinus']);
Route::post('cart-item-remove', [CartController::class, 'RemoveCartList']);
//Order
Route::post('place-order', [OrderController::class, 'placeOrder']);
Route::get('all-order', [OrderController::class, 'AllOrder']);
Route::post('update-order-status', [OrderController::class, 'updateOrderStatus']);
Route::get('my-order', [OrderController::class, 'customerAllOrder']);
Route::get('order-details-{order_id}', [OrderController::class, 'orderDetails']);
//review 
Route::get('reviewlist-{product_id}',[productReviewController::class, 'ReviewList']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
