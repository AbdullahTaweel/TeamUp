<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('{path?}', 'app');


Route::get('/project/add', function(){
    return view('app');
});

Route::get('/projects/create', function(){
    return view('app');
});


Route::get('/project/edit/{id}', function(){
    return view('app');
});

Route::get('/tasks/{id}', function(){
    return view('app');
});

Route::get('/tasks/show/task/add/{id}', function(){
    return view('app');
});


Route::get('projects/{id}/tasks', function(){
    return view('app');
});


Route::get('projects/{id}/tasks/add', function(){
    return view('app');
});


Route::get('tasks/edit/{taskId}', function(){
    return view('app');
});


Route::get('tasks/{id}/comments', function(){
    return view('app');
});


Route::get('tasks/{id}/comments/add', function(){
    return view('app');
});


Route::get('comments/edit/{id}', function(){
    return view('app');
});

Route::get('/projects/{id}/report', function(){
    return view('app');
});
