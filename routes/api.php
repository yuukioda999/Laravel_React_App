<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('logout', 'App\Http\Controllers\LoginController@logout');


Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::apiResource('tasks','App\Http\Controllers\TaskController');
    Route::patch('tasks/update-done/{task}','App\Http\Controllers\TaskController@updatedDone');
    Route::get('user', function (Request $request) {
        return $request->user();
    });
});