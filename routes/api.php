<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;


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

Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);


Route::get('projects', [ProjectController::class, 'index']);

Route::group(['middleware' => 'auth:api'], function () {

    Route::get('/details', [AuthController::class, 'details']);

    Route::get('/logout', [AuthController::class, 'logout']);

    //projects

    Route::get('projects', [ProjectController::class, 'getUserProjects']);

    Route::get('projects/{project}/show', [ProjectController::class, 'show']);

    Route::get('projects/{project}/edit', [ProjectController::class, 'edit']);

    Route::post('projects', [ProjectController::class, 'store']);

    Route::put('projects/{project}', [ProjectController::class, 'update']);

    Route::delete('projects/{project}',[ProjectController::class, 'destroy']);

    Route::get('projects/{project}',[ProjectController::class, 'getProjectTeam']);

    Route::get('users',[ProjectController::class, 'getUsers']);

    Route::post('projects/{project}/member',[ProjectController::class, 'addMember']);

    Route::get('projects/{project}/teamcount', [ProjectController::class, 'getTeamCount']);

    Route::put('projects/{project}/completed', [ProjectController::class, 'setCompleted']);

    Route::get('projects/{project}/getreport', [ProjectController::class, 'getReport']);

    // getProjectOwner

    //task
    Route::get('projects/{project}/tasks',[TaskController::class, 'getTasks']);

    Route::get('tasks/{task}',[TaskController::class, 'show']);

    Route::get('tasks/{task}/edit',[TaskController::class, 'edit']);

    //
    Route::post('projects/{project}/tasks',[TaskController::class, 'store']);

    Route::put('tasks/{task}',[TaskController::class, 'update']);

    Route::delete('tasks/{task}', [TaskController::class, 'destroy']);

    Route::put('tasks/{task}/priority', [TaskController::class, 'setPriority']);

    Route::put('tasks/{task}/stage', [TaskController::class, 'setStage']);

    Route::get('tasks/{task}/team',[TaskController::class, 'getTaskTeam']);

    Route::put('tasks/{task}/completed', [TaskController::class, 'setCompleted']);

    Route::post('tasks/{task}/taskMembers', [TaskController::class, 'addTaskMember']);

    Route::post('tasks/viewers/add', [TaskController::class, 'addViewers']);

    Route::get('tasks/{task}/viewers', [TaskController::class, 'getViewers']);


    //comments
    Route::get('tasks/{task}/comments', [CommentController::class, 'getCommentsTask']);

    Route::post('tasks/{task}/comments', [CommentController::class, 'store']);

    Route::get('comments/{comment}/edit', [CommentController::class, 'edit']);

    Route::put('comments/{comment}', [CommentController::class, 'update']);

    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

    Route::get('comments/{comment}/commenter', [CommentController::class, 'getCommenter']);


    //view for a task


    Route::get('projects/user/isOwner', [ProjectController::class, 'isOwner']);

});
