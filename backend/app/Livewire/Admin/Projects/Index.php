<?php

namespace App\Livewire\Admin\Projects;

use App\Livewire\Forms\ProjectForm;
use App\Models\Project;
use App\Models\Service;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public ProjectForm $form;

    #[Url]
    public string $search = '';

    #[Url]
    public string $service = '';

    public bool $modalOpen = false;
    public ?int $deleteId = null;

    public function updatedSearch(): void { $this->resetPage(); }
    public function updatedService(): void { $this->resetPage(); }

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
        $project = Project::findOrFail($id);
        $this->form->fillFrom($project);
        $this->modalOpen = true;
    }

    public function save(): void
    {
        $this->form->validate();

        if ($this->form->id) {
            $project = Project::findOrFail($this->form->id);
            $project->update($this->form->toPayload());
        } else {
            Project::create($this->form->toPayload());
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
            Project::whereKey($this->deleteId)->delete();
        }
        $this->deleteId = null;
        $this->resetPage();
    }

    public function render()
    {
        $q = Project::query()
            ->with('service:id,name')
            ->when($this->service !== '' && ctype_digit($this->service), fn($qq) => $qq->where('service_id', (int)$this->service))
            ->when($this->search !== '', fn($qq) => $qq->where('name', 'like', "%{$this->search}%"))
            ->orderByDesc('created_at');

        return view('livewire.admin.projects.index', [
            'projects' => $q->paginate(10),
            'services' => Service::query()->orderBy('name')->get(['id','name']),
        ]);
    }
}
