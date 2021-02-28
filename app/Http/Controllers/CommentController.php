<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function getCommentsTask(Task $task) {
        $comment = $task->comment;
        return response()->json($comment, 200);
    }

    public function getCommenter(Comment $comment){
        $user_name = $comment->users->name;

        return response()->json($user_name, 200);
    }

    public function store(Task $task, Request $request) {
        $attributes = $request->validate([
            'content' => 'required|string',
            'issue' => 'boolean',
        ]);

        $comment =
        Comment::create([
            'content' => $attributes['content'],
            'issue' => $attributes['issue'],
            'task_id' => $task->id,
            'users_id' => Auth::user()->id,
        ]);

        return response()->json($comment, 200);
    }

    public function edit(Comment $comment) {
        return response()->json($comment, 200);
    }

    public function update(Comment $comment, Request $request) {

        $comment->content = $request['content'];
        $comment->issue = $request['issue'];
        $comment->save();

        return response()->json(["message" => "UPDATED"], 200);
    }

    public function destroy(Comment $comment) {
        $comment->delete();
        return "successful deletion";
    }

}
