<?php

namespace App\Livewire\Admin\Contacts;

use App\Models\Contact;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public function delete(int $id): void
    {
        Contact::whereKey($id)->delete();
        session()->flash('status', 'Deleted');
    }

    public function render()
    {
        return view('livewire.admin.contacts.index', [
            'items' => Contact::query()->latest()->paginate(15),
        ]);
    }
}
