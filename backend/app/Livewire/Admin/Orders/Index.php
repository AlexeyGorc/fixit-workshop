<?php

namespace App\Livewire\Admin\Orders;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    #[Url]
    public string $status = '';

    #[Url]
    public string $service = ''; // service_id

    #[Url]
    public string $user = ''; // user_id

    public function updatedStatus(): void { $this->resetPage(); }
    public function updatedService(): void { $this->resetPage(); }
    public function updatedUser(): void { $this->resetPage(); }

    public function updateStatus(int $orderId, string $status): void
    {
        $this->validate([
            'status' => ['nullable'],
        ]);

        if (!in_array($status, ['pending', 'confirmed', 'completed', 'cancelled'], true)) {
            return;
        }

        $order = Order::findOrFail($orderId);
        $order->update(['order_status' => $status]);
    }

    public function render()
    {
        $q = Order::query()
            ->with(['service:id,name', 'user:id,name,email'])
            ->when($this->status !== '', fn($qq) => $qq->where('order_status', $this->status))
            ->when($this->service !== '' && ctype_digit($this->service), fn($qq) => $qq->where('service_id', (int)$this->service))
            ->when($this->user !== '' && ctype_digit($this->user), fn($qq) => $qq->where('user_id', (int)$this->user))
            ->orderByDesc('order_date')
            ->orderByDesc('id');

        return view('livewire.admin.orders.index', [
            'orders' => $q->paginate(10),
            'services' => Service::query()->orderBy('name')->get(['id','name']),
            'users' => User::query()->orderBy('name')->get(['id','name','email']),
        ]);
    }
}
