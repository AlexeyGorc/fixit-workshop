<div class="p-6 space-y-6">
    {{-- Header (Flux) --}}
    <div class="space-y-1">
        <flux:heading>Новости</flux:heading>
        <flux:subheading>Управление новостями, которые показываются на главной странице.</flux:subheading>
    </div>

    {{-- Actions --}}
    <div class="flex items-center justify-between gap-3">
        @if (session('status'))
            <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
                {{ session('status') }}
            </div>
        @else
            <div></div>
        @endif

        <button
            wire:click="create"
            class="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
            <span class="text-lg leading-none">+</span>
            Новая новость
        </button>
    </div>

    <flux:separator />

    {{-- Content --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {{-- List --}}
        <div class="lg:col-span-2 space-y-3">
            @forelse ($items as $n)
                <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <div class="flex items-start justify-between gap-4">
                        <div class="min-w-0">
                            <div class="flex flex-wrap items-center gap-2">
                                <div class="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                    {{ $n->title }}
                                </div>

                                <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                                    {{ $n->published_at->format('Y-m-d') }}
                                </span>
                            </div>

                            <div class="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                                {{ $n->body }}
                            </div>
                        </div>

                        <div class="flex shrink-0 items-center gap-2">
                            <button
                                wire:click="edit({{ $n->id }})"
                                class="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                            >
                                Edit
                            </button>

                            <button
                                wire:click="delete({{ $n->id }})"
                                onclick="return confirm('Удалить новость?')"
                                class="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <div class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Новостей пока нет</div>
                    <div class="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Создай первую новость для главной страницы.</div>

                    <button
                        wire:click="create"
                        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        <span class="text-lg leading-none">+</span>
                        Новая новость
                    </button>
                </div>
            @endforelse

            <div class="pt-2">
                {{ $items->links() }}
            </div>
        </div>

        {{-- Side card --}}
        <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
            <div class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Подсказки</div>
            <ul class="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300 list-disc pl-5">
                <li>Заголовок короткий и понятный.</li>
                <li>Первый абзац виден на главной в карточке.</li>
                <li>Дата влияет на порядок вывода.</li>
            </ul>
        </div>
    </div>

    {{-- Modal (Alpine + Livewire entangle) --}}
    <div
        x-data="{ open: @entangle('showModal') }"
        x-show="open"
        x-cloak
        class="fixed inset-0 z-50"
    >
        <div class="absolute inset-0 bg-black/40" @click="open = false"></div>

        <div class="absolute inset-0 flex items-center justify-center p-4">
            <div class="w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-zinc-900">
                <div class="flex items-start justify-between gap-4 border-b border-zinc-200 p-5 dark:border-zinc-700">
                    <div class="space-y-1">
                        <div class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {{ $editingId ? 'Редактировать новость' : 'Создать новость' }}
                        </div>
                        <div class="text-sm text-zinc-600 dark:text-zinc-300">
                            {{ $editingId ? 'Обнови текст и дату.' : 'Добавь новость для главной страницы.' }}
                        </div>
                    </div>

                    <button
                        type="button"
                        class="rounded-lg px-2 py-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        @click="open = false"
                    >
                        ✕
                    </button>
                </div>

                <form wire:submit.prevent="save" class="p-5 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">Title</label>
                        <input
                            wire:model.defer="title"
                            class="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-white"
                        />
                        @error('title') <div class="mt-1 text-sm text-red-600">{{ $message }}</div> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">Date</label>
                        <input
                            type="date"
                            wire:model.defer="published_at"
                            class="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-white"
                        />
                        @error('published_at') <div class="mt-1 text-sm text-red-600">{{ $message }}</div> @enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-1">Body</label>
                        <textarea
                            wire:model.defer="body"
                            rows="7"
                            class="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-white"
                        ></textarea>
                        @error('body') <div class="mt-1 text-sm text-red-600">{{ $message }}</div> @enderror
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-2">
                        <button
                            type="button"
                            @click="open = false"
                            class="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {{ $editingId ? 'Save changes' : 'Create' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

