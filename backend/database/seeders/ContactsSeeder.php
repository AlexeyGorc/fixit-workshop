<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contacts')->insert([
            [
                'name' => 'Иван Петров',
                'email' => 'ivan@example.com',
                'message' => 'Здравствуйте, интересует стоимость ремонта ноутбука.',
                'created_at' => Carbon::now()->subDays(3),
            ],
            [
                'name' => 'Мария Смирнова',
                'email' => 'maria@example.com',
                'message' => 'Можно ли заменить экран на iPhone?',
                'created_at' => Carbon::now()->subDays(2),
            ],
            [
                'name' => 'Алексей Иванов',
                'email' => 'alexey@example.com',
                'message' => 'Сколько времени занимает диагностика?',
                'created_at' => Carbon::now()->subDay(),
            ],
        ]);
    }
}
