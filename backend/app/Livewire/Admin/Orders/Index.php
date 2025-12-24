<?php

namespace App\Livewire\Admin\Orders;

use App\Models\Order;
use App\Models\Service;
use App\Models\User;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    protected $paginationTheme = 'tailwind';

    #[Url]
    public string $status = '';

    #[Url]
    public string $service = '';

    #[Url]
    public string $user = '';

    public function updatedStatus(): void { $this->resetPage(); }
    public function updatedService(): void { $this->resetPage(); }
    public function updatedUser(): void { $this->resetPage(); }

    public function updateStatus(int $orderId, string $status): void
    {
        if (!in_array($status, ['pending', 'confirmed', 'completed', 'cancelled'], true)) {
            return;
        }

        Order::whereKey($orderId)->update([
            'order_status' => $status,
        ]);

        session()->flash('status', 'Статус заказа обновлён');
    }

    public function render()
    {
        $orders = Order::query()
            ->with(['service:id,name', 'user:id,name,email'])
            ->when($this->status !== '', fn ($q) =>
            $q->where('order_status', $this->status)
            )
            ->when($this->service !== '' && ctype_digit($this->service), fn ($q) =>
            $q->where('service_id', (int) $this->service)
            )
            ->when($this->user !== '' && ctype_digit($this->user), fn ($q) =>
            $q->where('user_id', (int) $this->user)
            )
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(10);

        return view('livewire.admin.orders.index', [
            'orders' => $orders,
            'services' => Service::query()->orderBy('name')->get(['id', 'name']),
            'users' => User::query()->orderBy('name')->get(['id', 'name', 'email']),
        ]);
    }
}
