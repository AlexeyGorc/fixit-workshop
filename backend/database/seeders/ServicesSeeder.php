<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::query()->delete();

        Service::create([
            'name' => 'Ремонт мебели',
            'category' => 'household',
            'subcategory' => 'мебель',
            'description' => 'Ремонт, укрепление, замена фурнитуры, восстановление повреждений.',
            'price' => 500,
            'min_days' => 1,
            'max_days' => 5,
            'compare_specs' => [
                'warranty_months' => 3,
                'pickup_available' => true,
                'materials_included' => false,
            ],
        ]);

        Service::create([
            'name' => 'Ремонт бытовой техники',
            'category' => 'household',
            'subcategory' => 'бытовая техника',
            'description' => 'Диагностика, ремонт, замена узлов, обслуживание.',
            'price' => 800,
            'min_days' => 1,
            'max_days' => 7,
            'compare_specs' => [
                'warranty_months' => 2,
                'pickup_available' => true,
                'express_available' => true,
            ],
        ]);

        Service::create([
            'name' => 'Ремонт аксессуаров',
            'category' => 'household',
            'subcategory' => 'аксессуары',
            'description' => 'Мелкий ремонт, пайка, восстановление деталей.',
            'price' => 300,
            'min_days' => 1,
            'max_days' => 3,
            'compare_specs' => [
                'warranty_months' => 1,
                'express_available' => true,
            ],
        ]);

        Service::create([
            'name' => 'Ремонт оборудования',
            'category' => 'industrial',
            'subcategory' => 'оборудование',
            'description' => 'Техническое обслуживание и ремонт промышленного оборудования.',
            'price' => 2500,
            'min_days' => 3,
            'max_days' => 14,
            'compare_specs' => [
                'warranty_months' => 6,
                'on_site_service' => true,
                'diagnostics_included' => true,
            ],
        ]);

        Service::create([
            'name' => 'Ремонт станков',
            'category' => 'industrial',
            'subcategory' => 'станки',
            'description' => 'Ремонт станков, настройка, восстановление точности.',
            'price' => 4000,
            'min_days' => 5,
            'max_days' => 21,
            'compare_specs' => [
                'warranty_months' => 6,
                'on_site_service' => true,
                'spare_parts' => 'по согласованию',
            ],
        ]);

        Service::create([
            'name' => 'Ремонт сложных механизмов',
            'category' => 'industrial',
            'subcategory' => 'сложные механизмы',
            'description' => 'Диагностика и ремонт нестандартных механических узлов.',
            'price' => 3500,
            'min_days' => 7,
            'max_days' => 30,
            'compare_specs' => [
                'warranty_months' => 6,
                'custom_parts' => true,
            ],
        ]);

        Service::create([
            'name' => 'Индивидуальный проект (заявка)',
            'category' => 'custom_project',
            'subcategory' => null,
            'description' => 'Проектирование и изготовление уникального изделия по ТЗ клиента.',
            'price' => 0,
            'min_days' => 7,
            'max_days' => 60,
            'compare_specs' => [
                'requires_brief' => true,
                'prepayment' => 'обсуждается',
            ],
        ]);

        Service::create([
            'name' => 'Реставрация изделий',
            'category' => 'restoration',
            'subcategory' => null,
            'description' => 'Восстановление старых изделий: ремонт, покраска, замена деталей.',
            'price' => 1200,
            'min_days' => 3,
            'max_days' => 14,
            'compare_specs' => [
                'warranty_months' => 3,
                'materials_included' => true,
            ],
        ]);
    }
}
