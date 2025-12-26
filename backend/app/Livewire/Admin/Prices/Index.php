<?php

namespace App\Livewire\Admin\Prices;

use App\Livewire\Forms\PriceItemForm;
use App\Models\PriceListItem;
use App\Models\Service;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public PriceItemForm $form;

    #[Url]
    public string $search = '';

    #[Url]
    public string $service = '';

    public bool $modalOpen = false;
    public ?int $deleteId = null;

    public function openCreate(): void
    {
        $this->form->resetForm();

        if ($this->service !== '' && ctype_digit($this->service)) {
            $this->form->service_id = (int) $this->service;
        }

        $this->modalOpen = true;
    }

    public function openEdit(int $id): void
    {
        $item = PriceListItem::findOrFail($id);
        $this->form->fillFrom($item);
        $this->modalOpen = true;
    }

    public function save(): void
    {
        $this->form->validate();

        if ($this->form->id) {
            $item = PriceListItem::findOrFail($this->form->id);
            $item->update($this->form->toPayload());
        } else {
            PriceListItem::create($this->form->toPayload());
        }

        $this->modalOpen = false;
        $this->resetPage();
    }

    public function confirmDelete(int $id): void
    {
        $this->deleteId = $id;
    }

    public function delete(): void
    {
        if ($this->deleteId) {
            PriceListItem::whereKey($this->deleteId)->delete();
        }
        $this->deleteId = null;
        $this->resetPage();
    }

    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function updatedService(): void
    {
        $this->resetPage();
    }

    public function render()
    {
        $q = PriceListItem::query()
            ->with('service')
            ->when($this->service !== '' && ctype_digit($this->service), fn($qq) => $qq->where('service_id', (int)$this->service))
            ->when($this->search !== '', fn($qq) => $qq->where('description', 'like', "%{$this->search}%"))
            ->orderByDesc('created_at');

        return view('livewire.admin.prices.index', [
            'items' => $q->paginate(10),
            'services' => Service::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }
}
