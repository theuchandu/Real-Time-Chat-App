<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Auth::user()->groups()->with('users')->get();
        return response()->json($groups);
    }

    public function messages(Group $group)
    {
        $messages = $group->messages()->with('user')->get()->map(function ($message) {
            return [
                'id' => $message->id,
                'content' => $message->content,
                'created_at' => $message->created_at,
                'user_id' => $message->user_id,
                'user_name' => $message->user->name,
                'is_own' => $message->user_id === auth()->id(),
            ];
        });

        return response()->json($messages);
    }
}
