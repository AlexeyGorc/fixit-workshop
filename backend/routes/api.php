<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PriceListController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ReviewController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\CalcController;

Route::get('/news', [NewsController::class, 'index']);

Route::post('/contacts', [ContactController::class, 'store']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);
Route::get('/services/compare', [ServiceController::class, 'compare']);

Route::post('/calc', [CalcController::class, 'calc']);

Route::get('/prices', [PriceListController::class, 'index']);
Route::post('/calc/universal', [CalcController::class, 'calcUniversal']);

Route::get('/projects', [ProjectController::class, 'index']);

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{order}', [OrderController::class, 'show']);

Route::get('/reviews', [ReviewController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);
});
