<div class="p-6 space-y-6">
    <div class="space-y-1">
        <flux:heading>Контакты</flux:heading>
        <flux:subheading>Сообщения из формы обратной связи.</flux:subheading>
    </div>

    @if (session('status'))
        <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
            {{ session('status') }}
        </div>
    @endif

    <div class="space-y-3">
        @forelse ($items as $c)
            <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0 space-y-1">
                        <div class="font-semibold text-zinc-900 dark:text-zinc-100">
                            {{ $c->name }}
                        </div>

                        <div class="text-sm text-zinc-600 dark:text-zinc-300">
                            {{ $c->email }}
                            <span class="mx-2 text-zinc-400">•</span>
                            {{ $c->created_at->format('Y-m-d H:i') }}
                        </div>

                        <div class="mt-2 text-sm text-zinc-700 dark:text-zinc-200 whitespace-pre-line">
                            {{ $c->message }}
                        </div>
                    </div>

                    <button
                        wire:click="delete({{ $c->id }})"
                        onclick="return confirm('Удалить сообщение?')"
                        class="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        @empty
            <div class="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Сообщений нет</div>
                <div class="mt-1 text-sm text-zinc-600 dark:text-zinc-300">Когда кто-то отправит форму, они появятся здесь.</div>
            </div>
        @endforelse

        <div class="pt-2">
            {{ $items->links() }}
        </div>
    </div>
</div>
