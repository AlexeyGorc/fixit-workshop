<?php

use App\Http\Controllers\Api\ContactController;
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
