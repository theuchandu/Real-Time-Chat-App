<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\GroupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Protected routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Messenger routes
    Route::get('/messenger', [ConversationController::class, 'index'])->name('messenger');
    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');
    
    // Message routes for web (session-based) authentication
    Route::get('/conversations/{conversation}/messages', [App\Http\Controllers\MessageController::class, 'index'])->name('conversations.messages');
    Route::post('/conversations/{conversation}/messages', [App\Http\Controllers\MessageController::class, 'store'])->name('conversations.messages.store');
    Route::get('/groups', [GroupController::class, 'index'])->name('groups.index');
    Route::get('/groups/{group}/messages', [GroupController::class, 'messages'])->name('groups.messages');


    // Redirect dashboard to messenger
    Route::get('/dashboard', function () {
        return redirect()->route('messenger');
    })->name('dashboard');
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';