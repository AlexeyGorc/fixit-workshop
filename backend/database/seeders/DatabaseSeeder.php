<?php

namespace Database\Seeders;

use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            AdminSeeder::class,
            UserSeeder::class,
            NewsSeeder::class,
            ContactsSeeder::class,
            ServicesSeeder::class,
            PriceListSeeder::class,
            ProjectsSeeder::class,
        ]);
    }
}
