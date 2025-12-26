<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(
            ['slug' => 'admin'],
            ['name' => 'Admin']
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@fixit.local'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin'),
                'email_verified_at' => now(),
                'phone' => '88005553535',
            ]
        );

        $admin->roles()->syncWithoutDetaching([$adminRole->id]);
    }
}
