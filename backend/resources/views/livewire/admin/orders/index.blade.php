<div class="space-y-4">
    <div class="flex items-center gap-3">
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

    <div class="overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800">
        <table class="min-w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-900/40">
            <tr class="text-left">
                <th class="px-4 py-3 font-medium">ID</th>
                <th class="px-4 py-3 font-medium">Дата</th>
                <th class="px-4 py-3 font-medium">Пользователь</th>
                <th class="px-4 py-3 font-medium">Услуга</th>
                <th class="px-4 py-3 font-medium">Статус</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            @foreach($orders as $o)
                <tr>
                    <td class="px-4 py-3">{{ $o->id }}</td>
                    <td class="px-4 py-3">{{ $o->order_date?->format('Y-m-d') ?? $o->order_date }}</td>
                    <td class="px-4 py-3">
                        <div class="flex flex-col">
                            <span>{{ $o->user?->name ?? '—' }}</span>
                            <span class="text-xs opacity-70">{{ $o->user?->email }}</span>
                        </div>
                    </td>
                    <td class="px-4 py-3">{{ $o->service?->name ?? '—' }}</td>
                    <td class="px-4 py-3">
                        <flux:select
                            wire:change="updateStatus({{ $o->id }}, $event.target.value)"
                            class="max-w-[220px]"
                        >
                            <option value="pending" @selected($o->order_status === 'pending')>pending</option>
                            <option value="confirmed" @selected($o->order_status === 'confirmed')>confirmed</option>
                            <option value="completed" @selected($o->order_status === 'completed')>completed</option>
                            <option value="cancelled" @selected($o->order_status === 'cancelled')>cancelled</option>
                        </flux:select>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div>
        {{ $orders->links() }}
    </div>
</div>
