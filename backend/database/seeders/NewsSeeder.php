<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Открытие нового офиса',
                'body' => 'Мы запустили новый филиал в Москве для ещё большего удобства клиентов.',
                'published_at' => '2025-07-12',
            ],
            [
                'title' => 'Новая категория услуг',
                'body' => 'Теперь мы предлагаем ремонт промышленного оборудования и станков.',
                'published_at' => '2025-07-01',
            ],
            [
                'title' => 'Бонусная программа',
                'body' => 'Запустили систему бонусов и скидок для постоянных клиентов.',
                'published_at' => '2025-06-20',
            ],
            [
                'title' => 'Расширение команды мастеров',
                'body' => 'К нам присоединились новые специалисты по деревообработке и электронике.',
                'published_at' => '2025-06-10',
            ],
            [
                'title' => 'Обновление интерфейса сайта',
                'body' => 'Добавлены новые разделы, улучшена навигация и адаптивность на мобильных устройствах.',
                'published_at' => '2025-05-28',
            ],
            [
                'title' => 'Новый партнёр по поставке материалов',
                'body' => 'Мы заключили соглашение с поставщиком премиальных материалов для реставрации мебели.',
                'published_at' => '2025-05-15',
            ],
        ];

        foreach ($items as $data) {
            News::updateOrCreate(
                ['title' => $data['title'], 'published_at' => $data['published_at']],
                $data
            );
        }
    }
}
