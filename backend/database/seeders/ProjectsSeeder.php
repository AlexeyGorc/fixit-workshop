<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::query()->delete();

        $services = Service::all()->keyBy('name');

        $make = function (string $serviceName, array $projects) use ($services) {
            $service = $services->get($serviceName);
            if (!$service) return;

            foreach ($projects as $p) {
                Project::create([
                    'service_id' => $service->id,
                    'name' => $p['name'],
                    'description' => $p['description'] ?? null,
                    'image_url' => $p['image_url'] ?? null,
                ]);
            }
        };

        $make('Ремонт мебели', [
            ['name' => 'Восстановление стула', 'description' => 'Укрепление ножек и замена крепежа', 'image_url' => '/images/projects/chair.jpg'],
            ['name' => 'Ремонт кухонного фасада', 'description' => 'Замена петли и восстановление скола', 'image_url' => '/images/projects/kitchen.jpg'],
        ]);

        $make('Ремонт бытовой техники', [
            ['name' => 'Ремонт стиральной машины', 'description' => 'Замена насоса и чистка', 'image_url' => '/images/projects/washer.jpg'],
        ]);

        $make('Реставрация изделий', [
            ['name' => 'Реставрация комода', 'description' => 'Шлифовка + покраска + фурнитура', 'image_url' => '/images/projects/commode.jpg'],
        ]);
    }
}
