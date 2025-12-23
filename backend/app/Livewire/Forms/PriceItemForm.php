<?php

namespace App\Livewire\Forms;

use Livewire\Attributes\Validate;
use Livewire\Form;
use App\Models\PriceListItem;

class PriceItemForm extends Form
{
    public ?int $id = null;

    #[Validate('required|exists:services,id')]
    public int $service_id = 0;

    #[Validate('required|string')]
    public string $description = '';

    #[Validate('required|numeric|min:0')]
    public $price = 0;

    public function fillFrom(PriceListItem $item): void
    {
        $this->id = $item->id;
        $this->service_id = (int) $item->service_id;
        $this->description = $item->description;
        $this->price = $item->price;
    }

    public function toPayload(): array
    {
        return [
            'service_id' => $this->service_id,
            'description' => $this->description,
            'price' => $this->price,
        ];
    }

    public function resetForm(): void
    {
        $this->id = null;
        $this->service_id = 0;
        $this->description = '';
        $this->price = 0;
    }
}
