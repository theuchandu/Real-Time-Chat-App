<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/conversations/{conversation}/messages', [MessageController::class, 'index']);
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/conversations/{conversation}/messages', [MessageController::class, 'index'])->name('conversations.messages');
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store'])->name('conversations.messages.store');
    Route::get('/groups', [App\Http\Controllers\GroupController::class, 'index'])->name('groups.index');
    Route::get('/groups/{group}/messages', [App\Http\Controllers\GroupController::class, 'messages'])->name('groups.messages');
});