<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:checkUser,task')->only([
            'updatedDone','update','destroy'
        ]);
    }

    /**
     * Task一覧
     * @return Task 
     */
    public function index()
    {
        //タスクの一覧表示
        return Task::where('user_id',Auth::id())->orderByDesc('id')->get();
    }

    /**
     * @param TaskRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TaskRequest $request)
    {
        $request->merge([
            'user_id' => Auth::id()
        ]);
        $task = Task::create($request->all());

        return $task
            ? response()->json($task, 201)
            : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

     /**
     * @param TaskRequest $request
     * @param App\Models\Task;
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->title = $request->title;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }

    /**
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        return $task->delete()
        ? response()->json($task)
        : response()->json([], 500);
    }

    /**
     * @param Request $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatedDone(Task $task, Request $request)
    {
        $task->is_done = $request->is_done;

        return $task->update()
        ? response()->json($task)
        : response()->json([], 500);
    }



}
