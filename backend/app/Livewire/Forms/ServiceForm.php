<?php

namespace App\Livewire\Forms;

use Livewire\Attributes\Validate;
use Livewire\Form;
use App\Models\Service;

class ServiceForm extends Form
{
    public ?int $id = null;

    #[Validate('required|string|max:255')]
    public string $name = '';

    #[Validate('required|in:household,industrial,custom_project,restoration')]
    public string $category = 'household';

    #[Validate('nullable|string|max:255')]
    public ?string $subcategory = null;

    #[Validate('nullable|string')]
    public ?string $description = null;

    #[Validate('required|numeric|min:0')]
    public $price = 0;

    #[Validate('nullable|integer|min:0')]
    public ?int $min_days = null;

    #[Validate('nullable|integer|min:0')]
    public ?int $max_days = null;

    // compare_specs как JSON (в UI можно оставить textarea)
    #[Validate('nullable|string')]
    public ?string $compare_specs_json = null;

    public function fillFrom(Service $service): void
    {
        $this->id = $service->id;
        $this->name = $service->name;
        $this->category = $service->category;
        $this->subcategory = $service->subcategory;
        $this->description = $service->description;
        $this->price = $service->price;
        $this->min_days = $service->min_days;
        $this->max_days = $service->max_days;
        $this->compare_specs_json = $service->compare_specs ? json_encode($service->compare_specs, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) : null;
    }

    public function toPayload(): array
    {
        $specs = null;

        if ($this->compare_specs_json) {
            $decoded = json_decode($this->compare_specs_json, true);
            $specs = json_last_error() === JSON_ERROR_NONE ? $decoded : null;
        }

        return [
            'name' => $this->name,
            'category' => $this->category,
            'subcategory' => $this->subcategory,
            'description' => $this->description,
            'price' => $this->price,
            'min_days' => $this->min_days,
            'max_days' => $this->max_days,
            'compare_specs' => $specs,
        ];
    }

    public function resetForm(): void
    {
        $this->id = null;
        $this->name = '';
        $this->category = 'household';
        $this->subcategory = null;
        $this->description = null;
        $this->price = 0;
        $this->min_days = null;
        $this->max_days = null;
        $this->compare_specs_json = null;
    }
}
