<div class="space-y-4">
    <div class="flex items-center gap-3">
        <flux:input wire:model.live="search" placeholder="Поиск по описанию..." class="max-w-sm"/>

        <flux:select wire:model.live="service" class="max-w-sm">
            <option value="">Все услуги</option>
            @foreach($services as $s)
                <option value="{{ $s->id }}">{{ $s->name }}</option>
            @endforeach
        </flux:select>

        <flux:spacer />

        <flux:button variant="primary" wire:click="openCreate">+ Добавить позицию</flux:button>
    </div>

    <div class="overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800">
        <table class="min-w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-900/40">
            <tr class="text-left">
                <th class="px-4 py-3 font-medium">Услуга</th>
                <th class="px-4 py-3 font-medium">Описание</th>
                <th class="px-4 py-3 font-medium">Цена</th>
                <th class="px-4 py-3 font-medium text-right">Действия</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            @foreach($items as $item)
                <tr>
                    <td class="px-4 py-3">{{ $item->service?->name ?? '—' }}</td>
                    <td class="px-4 py-3">{{ $item->description }}</td>
                    <td class="px-4 py-3">{{ $item->price }}</td>
                    <td class="px-4 py-3 text-right">
                        <div class="inline-flex gap-2">
                            <flux:button size="sm" wire:click="openEdit({{ $item->id }})">Ред</flux:button>
                            <flux:button size="sm" variant="danger" wire:click="confirmDelete({{ $item->id }})">Удал</flux:button>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div>
        {{ $items->links() }}
    </div>

    <flux:modal wire:model="modalOpen">
        <flux:heading>{{ $form->id ? 'Редактировать позицию' : 'Новая позиция' }}</flux:heading>

        <div class="space-y-3 mt-4">
            <flux:select label="Услуга" wire:model.defer="form.service_id">
                <option value="0">Выбери услугу</option>
                @foreach($services as $s)
                    <option value="{{ $s->id }}">{{ $s->name }}</option>
                @endforeach
            </flux:select>

            <flux:textarea label="Описание" wire:model.defer="form.description" />
            <flux:input label="Цена" type="number" step="0.01" wire:model.defer="form.price" />
        </div>

        <div class="mt-5 flex justify-end gap-2">
            <flux:button wire:click="$set('modalOpen', false)" variant="ghost">Отмена</flux:button>
            <flux:button wire:click="save" variant="primary">Сохранить</flux:button>
        </div>
    </flux:modal>

    <flux:modal :open="$deleteId !== null" @close="$wire.set('deleteId', null)">
        <flux:heading>Удалить позицию прайса?</flux:heading>
        <div class="mt-4 flex justify-end gap-2">
            <flux:button variant="ghost" wire:click="$set('deleteId', null)">Отмена</flux:button>
            <flux:button variant="danger" wire:click="delete">Удалить</flux:button>
        </div>
    </flux:modal>
</div>
