<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition(): array
    {
        $groupId = null;
        $receiverId = null;

        if ($this->faker->boolean(50)) {
            // Message belongs to a group
            $group = Group::inRandomOrder()->with('users')->first();
            if ($group && $group->users->count() > 0) {
                $groupId = $group->id;
                $senderId = $this->faker->randomElement($group->users->pluck('id')->toArray());
            } else {
                // fallback if group has no users
                $senderId = User::inRandomOrder()->first()->id;
            }
        } else {
            // Direct message between users
            $sender = User::inRandomOrder()->first();
            $receiver = User::where('id', '!=', $sender->id)->inRandomOrder()->first();

            $senderId = $sender->id;
            $receiverId = $receiver->id;
        }

        return [
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'group_id' => $groupId,
            'message' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
