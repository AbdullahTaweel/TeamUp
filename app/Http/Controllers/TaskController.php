<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\View;
use App\Models\Task;
use App\Models\TaskUserEvent;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    function getTasks(Project $project){

        $due =  $project->task->where('stage', '=', 0)->sortByDesc('priority')->flatten();

        $progress =  $project->task->where('stage', '=', 1)->sortByDesc('priority')->flatten();

        $finalized =  $project->task->where('stage', '=', 2)->sortByDesc('priority')->flatten();

        return response()->json([$due, $progress, $finalized], 200);
    }

    public function store(Request $request, $project_id)
    {
        $request->validate([
            'name' => 'required',
            'description',
            'completed',
            'stage',
            'priority',
            'start_date',
            'end_date',

        ]);

        $task = Task::create([
            'name' => $request['name'],
            'description' => $request['description'],
            'completed' => $request['completed'],
            'stage' => $request['stage'],
            'priority' => $request['priority'],
            'start_date' => $request['start_date'],
            'end_date' => $request['end_date'],
            'project_id' =>  $project_id,
        ]);


        $user = Auth::user();


        TaskUserEvent::create([
            'users_id' => $user->id,
            'task_id' => $task->id,
        ]);


        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return response()->json($task, 200);
    }

    public function edit(Task $task)
    {
        return response()->json($task, 200);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['msg'=> 'task deleted '], 200);
    }

 public function update(Request $request, Task $task)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'string',
            'completed' => 'boolean',
            'stage' => 'integer',
            'priority'=> 'integer',
            'start_date'=> 'date',
            'end_date'=> 'date'
        ]);

        $task->update($request->all());

        return response()->json($task);

    }


    public function setPriority(Request $request, Task $task){

        $request->validate([
            'priority' => 'required|integer'
        ]);

        $task->update($request->priority);

        return response()->json($task, 200);
    }

    public function setStage(Request $request, Task $task){

        $request->validate([
            'stage' => 'required|integer'
        ]);

        $task->update([
            'stage' => $request['stage'],
        ]);

        return response()->json($task, 200);
    }

    public function getTaskTeam(Task $task){ //Return a list of users object assigned to one task

        $event = $task->event;

        $users = [];

        $i=0;

        foreach($event as $infoUser){

            $users[$i] = $infoUser->users;
            $i++;
        }

        return response()->json($users, 200);
    }

    public function setCompleted(Task $task, Request $request) {
        $request->validate([
            'completed' => 'boolean',
        ]);

        $task->completed = $request['completed'];
        $task->stage = 2;
        $task->save();

        return response()->json($task, 200);
    }

    public function addTaskMember(Task $task, Request $request) {
        $request->validate([
            'user_id' => 'integer',
        ]);

        TaskUserEvent::create([
            'users_id' => $request['user_id'],
            'task_id' => $task->id,
        ]);

        return response()->json($task, 200);
    }
    public function getViewers(Task $task){
        $viewers = $task->view;

        $users = [];
        $i = 0;
        foreach($viewers as $getviewers ){
            $users[$i] = $getviewers->users;
            $i++;
        }

        return response()->json($users, 200);
    }

    public function addViewers(Task $task, Request $request){

        $request->validate([
            'task_id' => 'integer',
            ]);
            
        $user = Auth::user();

        View::create([
            'users_id' => $user->id,
            'task_id' => $request['task_id'],
        ]);

        return response()->json( ['msg' => 'seen'], 200);
    }
}
