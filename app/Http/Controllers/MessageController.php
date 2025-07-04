<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        broadcast(new NewMessage($message))->toOthers();

        return back();
    }

    public function index(\App\Models\Conversation $conversation)
    {
        $messages = $conversation->messages()
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'content' => $message->content,
                    'created_at' => $message->created_at,
                    'user_id' => $message->user_id,
                    'is_own' => $message->user_id === auth()->id(),
                ];
            });

            // dd($messages);
        return response()->json($messages);
    }
} 