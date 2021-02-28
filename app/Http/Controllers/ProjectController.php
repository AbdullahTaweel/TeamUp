<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\ProjectUserEvent;
use App\Models\User;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //
    public function getUserProjects()
    {

        $users = Auth::user();

        //select * from project_user_event as event,projects where
        //users.user_id = event.user_id and event.project_id = project.project_id and
        // user_id= 1
       $event = $users->projectEvent;

       $project = [];

       $i=0;

        foreach($event as $infoProject){
            $project[$i] = $infoProject->project;
            $newCompete = array('count'=> $infoProject->project->event->count());
            $array = $project[$i]->toArray();
            array_push($array, $newCompete) ;
          
            // $arr = $project[$i]->toArray();
            // array_push($arr, $access) ;
            $i++;
        }

       return response()->json($project, 201);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'string',
            'completed' => 'boolean',
            'start_date'=> 'date',
            'end_date'=> 'date'
        ]);

        $project = Project::create($request->all());


        $user = Auth::user();


        ProjectUserEvent::create([
            'isOwner' => 1,
            'users_id' => $user->id,
            'project_id' => $project->id
        ]);


        return response()->json($project, 201);
    }



    public function show(Project $project)
    {
        return response()->json($project, 201);
    }


    public function edit(Project $project)
    {
        return response()->json($project, 201);
    }


    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'string',
            'completed' => 'boolean',
            'start_date'=> 'date',
            'end_date'=> 'date'
        ]);


        $project->update($request->all());

        return response()->json($project, 201);
    }


    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json($project, 201);
    }

    public function setReport(){
       //
    }

    public function setCompleted(Project $project, Request $request) {
        $request->validate([
            'completed' => 'boolean',
        ]);

        $project->completed = $request['completed'];
        $project->save();
        return response()->json($project, 200);
    }

    public function getProjectTeam(Project $project){ //Returns an array of users assigned to one project
            $user = Auth::user();

            $event = $project->event;

            $users = [];

            $i=0;
             foreach($event as $infoUser){
                 if($user->id !=  $infoUser->users->id) {
                    $users[$i] = $infoUser->users;
                    $i++;
                 }
             }

            return response()->json($users, 201);

    }

    public function getTeamCount(Project $project) {
        $count = $project->event->count();
        return response()->json($count, 200);
    }

    public function getUsers(){
        $users = User::all();
        return response()->json($users, 201);
    }


    public function addMember(Request $request, Project $project){

        $request->validate([
            'user_id' => 'required'
        ]);

        ProjectUserEvent::create([
            'isOwner' => 0,
            'users_id' => $request['user_id'],
            'project_id' => $project->id
        ]);
    }

    public function getReport(Project $project) {
        $projectEvent = $project->event;

        $projectMembers = [];

        $i=0;
        foreach($projectEvent as $projectMember){
               $projectMembers[$i] = $projectMember->users;
               $i++;
        }

        $infoTask = $project->task->flatten();
        $taskEvent = [];

        $taskMembers = [];

        $i=0;
        foreach($infoTask as $taskMember){
            $taskEvent[$i] = $taskMember->event;
            $j = 0;
            foreach($taskEvent[$i] as $member) {
                $taskMembers[$j] = $member->users;
                $j++;
            }
            $i++;
        }

        

        return response()->json([$project, $projectMembers, $infoTask, $taskMembers], 200);
    }


    public function isOwner(){

        $users = Auth::user();

        $event = $users->projectEvent;

       $canAcces = [];

       $i=0;

        foreach($event as $access){
            $canAccess[$i] = $access->isOwner;
            $i++;
        }

       return response()->json($canAccess, 201);



    }
}
