<?php

namespace App\Livewire\Admin\Services;

use App\Livewire\Forms\ServiceForm;
use App\Models\Service;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public ServiceForm $form;

    #[Url]
    public string $search = '';

    #[Url]
    public string $category = '';

    public bool $modalOpen = false;
    public ?int $deleteId = null;

    public function openCreate(): void
    {
        $this->form->resetForm();
        $this->modalOpen = true;
    }

    public function openEdit(int $id): void
    {
        $service = Service::findOrFail($id);
        $this->form->fillFrom($service);
        $this->modalOpen = true;
    }

    public function save(): void
    {
        $this->form->validate();

        if ($this->form->id) {
            $service = Service::findOrFail($this->form->id);
            $service->update($this->form->toPayload());
        } else {
            Service::create($this->form->toPayload());
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
            Service::whereKey($this->deleteId)->delete();
        }
        $this->deleteId = null;
        $this->resetPage();
    }

    public function render()
    {
        $q = Service::query()
            ->when($this->search !== '', fn($qq) => $qq->where('name', 'like', "%{$this->search}%"))
            ->when($this->category !== '', fn($qq) => $qq->where('category', $this->category))
            ->orderByDesc('created_at');

        return view('livewire.admin.services.index', [
            'services' => $q->paginate(10),
        ]);
    }
}
