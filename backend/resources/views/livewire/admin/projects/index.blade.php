<div class="space-y-4">
    <div class="flex items-center gap-3">
        <flux:input wire:model.live="search" placeholder="Поиск по названию..." class="max-w-sm"/>

        <flux:select wire:model.live="service" class="max-w-sm">
            <option value="">Все услуги</option>
            @foreach($services as $s)
                <option value="{{ $s->id }}">{{ $s->name }}</option>
            @endforeach
        </flux:select>

        <flux:spacer />

        <flux:button variant="primary" wire:click="openCreate">+ Добавить проект</flux:button>
    </div>

    <div class="overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800">
        <table class="min-w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-900/40">
            <tr class="text-left">
                <th class="px-4 py-3 font-medium">Услуга</th>
                <th class="px-4 py-3 font-medium">Название</th>
                <th class="px-4 py-3 font-medium">Image</th>
                <th class="px-4 py-3 font-medium text-right">Действия</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            @foreach($projects as $p)
                <tr>
                    <td class="px-4 py-3">{{ $p->service?->name ?? '—' }}</td>
                    <td class="px-4 py-3">{{ $p->name }}</td>
                    <td class="px-4 py-3">
                        @if($p->image_url)
                            <a class="underline underline-offset-4" href="{{ $p->image_url }}" target="_blank">open</a>
                        @else
                            —
                        @endif
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="inline-flex gap-2">
                            <flux:button size="sm" wire:click="openEdit({{ $p->id }})">Ред</flux:button>
                            <flux:button size="sm" variant="danger" wire:click="confirmDelete({{ $p->id }})">Удал</flux:button>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div>
        {{ $projects->links() }}
    </div>

    {{-- Modal create/edit --}}
    <flux:modal wire:model="modalOpen">
        <flux:heading>{{ $form->id ? 'Редактировать проект' : 'Новый проект' }}</flux:heading>

        <div class="space-y-3 mt-4">
            <flux:select label="Услуга" wire:model.defer="form.service_id">
                <option value="0">Выбери услугу</option>
                @foreach($services as $s)
                    <option value="{{ $s->id }}">{{ $s->name }}</option>
                @endforeach
            </flux:select>

            <flux:input label="Название" wire:model.defer="form.name" />
            <flux:textarea label="Описание" wire:model.defer="form.description" />
            <flux:input label="Image URL" wire:model.defer="form.image_url" />
        </div>

        <div class="mt-5 flex justify-end gap-2">
            <flux:button wire:click="$set('modalOpen', false)" variant="ghost">Отмена</flux:button>
            <flux:button wire:click="save" variant="primary">Сохранить</flux:button>
        </div>
    </flux:modal>

    {{-- Delete confirm --}}
    <flux:modal :open="$deleteId !== null" @close="$wire.set('deleteId', null)">
        <flux:heading>Удалить проект?</flux:heading>
        <div class="mt-4 flex justify-end gap-2">
            <flux:button variant="ghost" wire:click="$set('deleteId', null)">Отмена</flux:button>
            <flux:button variant="danger" wire:click="delete">Удалить</flux:button>
        </div>
    </flux:modal>
</div>
