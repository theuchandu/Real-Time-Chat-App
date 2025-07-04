<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Models\Group;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users
        $admin = User::factory()->create([
            'name'  => 'admin',
            'email' => 'test@gmail.com',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
        ]);

        $chandu = User::factory()->create([
            'name'  => 'chandu',
            'email' => 'chandu@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        $users = User::factory(10)->create();

        // Create conversations and attach participants
        for ($i = 0; $i < 5; $i++) {
            $conversation = Conversation::create();

            // Pick random users for this conversation (including admin)
            $participantIds = User::inRandomOrder()->limit(rand(2, 5))->pluck('id')->toArray();
            $participantIds[] = $admin->id; // Ensure admin is always a participant
            $participantIds = array_unique($participantIds);

            $conversation->participants()->attach($participantIds);

            // Create messages for this conversation
            foreach (range(1, rand(5, 20)) as $j) {
                Message::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $participantIds[array_rand($participantIds)],
                    'content' => "Test message $j in conversation $conversation->id",
                    'created_at' => now()->subMinutes(rand(0, 1000)),
                    'updated_at' => now(),
                ]);
            }
        }

        // Group chat seeding starts here 
        for ($i = 1; $i < 3; $i++) {
            $group = Group::create([
                'name' => 'Group ' . $i,
                'description' => 'Group ' . $i . ' description',
                'owner_id' => 1,
            ]);

            // Pick random users for this group
            $groupuserIds = User::inRandomOrder()->limit(rand(3, 6))->pluck('id')->toArray();
            $groupuserIds[] = $admin->id;
            $group->users()->attach(array_unique($groupuserIds));

            // Create messages for this group
            foreach (range(1, rand(5, 20)) as $j) {
                Message::create([
                    'group_id' => $group->id,
                    'user_id' => $groupuserIds[array_rand($groupuserIds)],
                    'content' => "Test message $j in group $group->id",
                    'created_at' => now()->subMinutes(rand(0, 1000)),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}   
