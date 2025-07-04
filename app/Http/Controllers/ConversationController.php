<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index()
    {

        $conversations = Auth::user()
            ->conversations()
            ->with(['participants', 'lastMessage'])
            ->get()
            ->map(function ($conversation) {
                $otherParticipant = $conversation->participants
                    ->where('id', '!=', Auth::id())
                    ->first();

                return [
                    'id' => $conversation->id,
                    'participant' => [
                        'id' => $otherParticipant->id,
                        'name' => $otherParticipant->name,
                        'avatar' => $otherParticipant->avatar,
                        'is_online' => $otherParticipant->is_online,
                    ],
                    'last_message' => $conversation->lastMessage ? [
                        'content' => $conversation->lastMessage->content,
                        'created_at' => $conversation->lastMessage->created_at,
                    ] : null,
                    'unread_count' => $conversation->messages()
                        ->where('user_id', '!=', Auth::id())
                        ->where('read_at', null)
                        ->count(),
                ];
            });


        return Inertia::render('Messenger/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Check if conversation already exists
        $existingConversation = Auth::user()
            ->conversations()
            ->whereHas('participants', function ($query) use ($request) {
                $query->where('users.id', $request->user_id);
            })
            ->first();

        if ($existingConversation) {
            return redirect()->route('conversations.show', $existingConversation);
        }

        // Create new conversation
        $conversation = Conversation::create();
        $conversation->participants()->attach([Auth::id(), $request->user_id]);
        dd('2');

        return redirect()->route('conversations.show', $conversation);
    }

    public function show(Conversation $conversation)
    {
        // Check if user is part of the conversation
        if (!$conversation->participants->contains(Auth::id())) {
            abort(403);
        }

        $messages = $conversation->messages()
            ->with('user')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'content' => $message->content,
                    'created_at' => $message->created_at,
                    'is_own' => $message->user_id === Auth::id(),
                ];
            });

        dd('3');

        $otherParticipant = $conversation->participants
            ->where('id', '!=', Auth::id())
            ->first();

        return Inertia::render('Messenger/Show', [
            'conversation' => [
                'id' => $conversation->id,
                'participant' => [
                    'id' => $otherParticipant->id,
                    'name' => $otherParticipant->name,
                    'avatar' => $otherParticipant->avatar,
                    'is_online' => $otherParticipant->is_online,
                ],
            ],
            'messages' => $messages,
        ]);
    }
} 