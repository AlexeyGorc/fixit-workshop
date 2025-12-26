<div class="p-6 space-y-6">
    <div class="space-y-1">
        <flux:heading>Заказы</flux:heading>
        <flux:subheading>Все заявки клиентов.</flux:subheading>
    </div>

    <div class="flex flex-wrap items-center gap-3">
        <flux:select wire:model.live="status" class="max-w-xs">
            <option value="">Все статусы</option>
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
        </flux:select>

        <flux:select wire:model.live="service" class="max-w-sm">
            <option value="">Все услуги</option>
            @foreach($services as $s)
                <option value="{{ $s->id }}">{{ $s->name }}</option>
            @endforeach
        </flux:select>

        <flux:select wire:model.live="user" class="max-w-sm">
            <option value="">Все пользователи</option>
            @foreach($users as $u)
                <option value="{{ $u->id }}">
                    {{ $u->name ?? $u->email }}
                </option>
            @endforeach
        </flux:select>

        <flux:spacer />
    </div>

    @if (session('status'))
        <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
            {{ session('status') }}
        </div>
    @endif

    <div class="overflow-x-auto rounded-xl border border-zinc-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <table class="min-w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-900/40">
            <tr class="text-left text-zinc-600 dark:text-zinc-300">
                <th class="px-4 py-3 font-medium">ID</th>
                <th class="px-4 py-3 font-medium">Дата</th>
                <th class="px-4 py-3 font-medium">Клиент</th>
                <th class="px-4 py-3 font-medium">Услуга</th>
                <th class="px-4 py-3 font-medium">Сумма</th>
                <th class="px-4 py-3 font-medium">Статус</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            @forelse($orders as $o)
                <tr>
                    <td class="px-4 py-3 font-medium">#{{ $o->id }}</td>

                    <td class="px-4 py-3 text-zinc-500">
                        {{ $o->created_at->format('Y-m-d') }}
                    </td>

                    <td class="px-4 py-3">
                        <div class="flex flex-col">
                                <span class="font-medium">
                                    {{ $o->name ?? $o->user?->name ?? '—' }}
                                </span>
                            <span class="text-xs opacity-70">
                                    {{ $o->email ?? $o->user?->email }}
                                </span>
                        </div>
                    </td>

                    <td class="px-4 py-3">
                        {{ $o->service?->name ?? '—' }}
                    </td>

                    <td class="px-4 py-3 font-semibold">
                        {{ number_format($o->total, 2) }}
                    </td>

                    <td class="px-4 py-3">
                        <flux:select
                            wire:change="updateStatus({{ $o->id }}, $event.target.value)"
                            class="max-w-[200px]"
                        >
                            <option value="pending" @selected($o->order_status === 'pending')>pending</option>
                            <option value="confirmed" @selected($o->order_status === 'confirmed')>confirmed</option>
                            <option value="completed" @selected($o->order_status === 'completed')>completed</option>
                            <option value="cancelled" @selected($o->order_status === 'cancelled')>cancelled</option>
                        </flux:select>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="px-6 py-10 text-center text-zinc-500">
                        Заказов пока нет
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>

    <div>
        {{ $orders->links() }}
    </div>
</div>
