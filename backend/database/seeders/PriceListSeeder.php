<?php

namespace Database\Seeders;

use App\Models\PriceListItem;
use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PriceListItem::query()->delete();

        $services = Service::all()->keyBy('name');

        $add = function (string $serviceName, array $items) use ($services) {
            $service = $services->get($serviceName);
            if (!$service) return;

            foreach ($items as $item) {
                PriceListItem::create([
                    'service_id' => $service->id,
                    'description' => $item['description'],
                    'price' => $item['price'],
                ]);
            }
        };

        $add('Ремонт мебели', [
            ['description' => 'Диагностика/осмотр', 'price' => 200],
            ['description' => 'Замена фурнитуры', 'price' => 450],
            ['description' => 'Укрепление конструкции', 'price' => 700],
        ]);

        $add('Ремонт бытовой техники', [
            ['description' => 'Диагностика', 'price' => 300],
            ['description' => 'Замена расходников', 'price' => 600],
            ['description' => 'Ремонт узла', 'price' => 1200],
        ]);

        $add('Ремонт станков', [
            ['description' => 'Выезд и диагностика', 'price' => 1500],
            ['description' => 'Настройка/калибровка', 'price' => 2500],
            ['description' => 'Ремонт механики', 'price' => 5000],
        ]);

        $add('Реставрация изделий', [
            ['description' => 'Подготовка поверхности', 'price' => 600],
            ['description' => 'Покраска/покрытие', 'price' => 900],
            ['description' => 'Восстановление деталей', 'price' => 1400],
        ]);
    }
}
