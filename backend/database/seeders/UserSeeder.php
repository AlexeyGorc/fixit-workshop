<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRole = Role::where('slug', 'user')->firstOrFail();

        $count = 10;

        User::factory()
            ->count($count)
            ->create()
            ->each(function (User $user) use ($userRole) {
                $user->roles()->attach($userRole->id);
            });
    }
}
