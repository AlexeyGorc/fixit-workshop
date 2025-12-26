<div class="space-y-4">
    <div class="flex items-center gap-3">
        <flux:input wire:model.live="search" placeholder="Поиск услуги..." class="max-w-sm"/>

        <flux:select wire:model.live="category" class="max-w-xs">
            <option value="">Все категории</option>
            <option value="household">household</option>
            <option value="industrial">industrial</option>
            <option value="custom_project">custom_project</option>
            <option value="restoration">restoration</option>
        </flux:select>

        <flux:spacer />

        <flux:button variant="primary" wire:click="openCreate">+ Добавить услугу</flux:button>
    </div>

    <div class="overflow-x-auto rounded-xl border border-zinc-200/60 dark:border-zinc-800">
        <table class="min-w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-900/40">
            <tr class="text-left">
                <th class="px-4 py-3 font-medium">Название</th>
                <th class="px-4 py-3 font-medium">Категория</th>
                <th class="px-4 py-3 font-medium">Подкатегория</th>
                <th class="px-4 py-3 font-medium">Цена</th>
                <th class="px-4 py-3 font-medium">Сроки</th>
                <th class="px-4 py-3 font-medium text-right">Действия</th>
            </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100 dark:divide-zinc-800">
            @foreach($services as $s)
                <tr>
                    <td class="px-4 py-3">{{ $s->name }}</td>
                    <td class="px-4 py-3">{{ $s->category }}</td>
                    <td class="px-4 py-3">{{ $s->subcategory }}</td>
                    <td class="px-4 py-3">{{ $s->price }}</td>
                    <td class="px-4 py-3">
                        @if($s->min_days !== null || $s->max_days !== null)
                            {{ $s->min_days ?? '—' }}–{{ $s->max_days ?? '—' }} дн.
                        @else
                            —
                        @endif
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="inline-flex gap-2">
                            <flux:button size="sm" wire:click="openEdit({{ $s->id }})">Ред</flux:button>
                            <flux:button size="sm" variant="danger" wire:click="confirmDelete({{ $s->id }})">Удал</flux:button>
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <div>
        {{ $services->links() }}
    </div>

    <flux:modal wire:model="modalOpen">
        <flux:heading>{{ $form->id ? 'Редактировать услугу' : 'Новая услуга' }}</flux:heading>

        <div class="space-y-3 mt-4">
            <flux:input label="Название" wire:model.defer="form.name" />
            <flux:select label="Категория" wire:model.defer="form.category">
                <option value="household">household</option>
                <option value="industrial">industrial</option>
                <option value="custom_project">custom_project</option>
                <option value="restoration">restoration</option>
            </flux:select>
            <flux:input label="Подкатегория" wire:model.defer="form.subcategory" placeholder="мебель / станки ..." />
            <flux:textarea label="Описание" wire:model.defer="form.description" />
            <flux:input label="Цена" type="number" step="0.01" wire:model.defer="form.price" />
            <div class="grid grid-cols-2 gap-3">
                <flux:input label="Min days" type="number" wire:model.defer="form.min_days" />
                <flux:input label="Max days" type="number" wire:model.defer="form.max_days" />
            </div>
            <flux:textarea label="compare_specs (JSON)" wire:model.defer="form.compare_specs_json" />
        </div>

        <div class="mt-5 flex justify-end gap-2">
            <flux:button wire:click="$set('modalOpen', false)" variant="ghost">Отмена</flux:button>
            <flux:button wire:click="save" variant="primary">Сохранить</flux:button>
        </div>
    </flux:modal>

    <flux:modal :open="$deleteId !== null" @close="$wire.set('deleteId', null)">
        <flux:heading>Удалить услугу?</flux:heading>
        <div class="mt-4 flex justify-end gap-2">
            <flux:button variant="ghost" wire:click="$set('deleteId', null)">Отмена</flux:button>
            <flux:button variant="danger" wire:click="delete">Удалить</flux:button>
        </div>
    </flux:modal>
</div>
