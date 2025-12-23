<?php

namespace App\Livewire\Admin\News;

use App\Models\News;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;
    public bool $showModal = false;

    public ?int $editingId = null;

    public string $title = '';
    public string $body = '';
    public string $published_at = '';

    protected function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:225'],
            'body' => ['required', 'string'],
            'published_at' => ['required', 'date'],
        ];
    }

    public function create(): void
    {
        $this->resetForm();
        $this->editingId = null;
        $this->showModal = true;
    }

    public function edit(int $id): void
    {
        $n = News::findOrFail($id);

        $this->editingId = $n->id;
        $this->title = $n->title;
        $this->body = $n->body;
        $this->published_at = $n->published_at->format('Y-m-d');

        $this->showModal = true;
    }

    public function save(): void
    {
        $data = $this->validate();

        News::updateOrCreate(['id' => $this->editingId], $data);

        $this->showModal = false;
        $this->resetForm();
        $this->editingId = null;

        session()->flash('status', 'Saved');
    }

    public function delete(int $id): void
    {
        News::query()->whereKey($id)->delete();
        session()->flash('status', 'Deleted');
    }

    private function resetForm(): void
    {
        $this->title = '';
        $this->body = '';
        $this->published_at = now()->toDateString();
    }

    public function render()
    {
        return view('livewire.admin.news.index', [
            'items' => News::query()->orderByDesc('published_at')->paginate(10),
        ]);
    }
}
