"use client";

import { useMemo, useState } from "react";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    subcategory: string | null;
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

const categoryRu: Record<string, string> = {
    household: "Бытовые изделия",
    industrial: "Промышленные изделия",
    custom_project: "Индивидуальные проекты",
    restoration: "Реставрация",
};

function formatDays(min: number | null, max: number | null) {
    if (min == null && max == null) return "—";
    if (min != null && max != null) return `${min}–${max} дней`;
    if (min != null) return `от ${min} дней`;
    return `до ${max} дней`;
}

export default function CompareClient({ services }: { services: Service[] }) {
    const [q, setQ] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const selected = useMemo(
        () => selectedIds.map((id) => services.find((s) => s.id === id)).filter(Boolean) as Service[],
        [selectedIds, services]
    );

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return services.slice(0, 20);

        return services
            .filter((x) => {
                const name = x.name.toLowerCase();
                const sub = (x.subcategory ?? "").toLowerCase();
                const cat = x.category.toLowerCase();
                return name.includes(s) || sub.includes(s) || cat.includes(s);
            })
            .slice(0, 30);
    }, [services, q]);

    function add(id: number) {
        setSelectedIds((prev) => {
            if (prev.includes(id)) return prev;
            if (prev.length >= 4) return prev;
            return [...prev, id];
        });
    }

    function remove(id: number) {
        setSelectedIds((prev) => prev.filter((x) => x !== id));
    }

    function reset() {
        setSelectedIds([]);
    }

    return (
        <main className="py-12 px-4 space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-3">Сравнение услуг</h1>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                    Выбери 2–4 услуги и сравни цены и сроки выполнения.
                </p>
            </section>

            <section className="bg-white text-black rounded shadow p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Найти услугу..."
                        className="w-full sm:max-w-md rounded px-3 py-2 border"
                    />

                    <div className="ml-auto flex gap-2">
                        <button
                            type="button"
                            onClick={reset}
                            className="px-3 py-2 rounded bg-zinc-100"
                        >
                            Сбросить
                        </button>
                    </div>
                </div>

                <div className="max-h-64 overflow-auto border rounded">
                    {filtered.map((s) => {
                        const chosen = selectedIds.includes(s.id);
                        return (
                            <div
                                key={s.id}
                                className="flex items-center gap-3 px-3 py-2 border-b"
                            >
                                <div className="flex-1">
                                    <div className="font-medium">{s.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {categoryRu[s.category] ?? s.category}
                                        {s.subcategory ? ` • ${s.subcategory}` : ""}
                                    </div>
                                </div>

                                <div className="text-sm whitespace-nowrap">{s.price} ₽</div>

                                <button
                                    type="button"
                                    className={`px-3 py-1 rounded ${
                                        chosen ? "bg-zinc-300" : "bg-black text-white"
                                    }`}
                                    onClick={() => add(s.id)}
                                    disabled={chosen || selectedIds.length >= 4}
                                >
                                    {chosen ? "Добавлено" : "+"}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="text-sm text-gray-600">
                    Выбрано: {selectedIds.length} / 4
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-2xl font-semibold">Таблица сравнения</h2>

                {selected.length < 2 ? (
                    <div className="opacity-80">Выбери хотя бы 2 услуги для сравнения.</div>
                ) : (
                    <div className="overflow-x-auto bg-white text-black rounded shadow">
                        <table className="min-w-[720px] w-full text-sm">
                            <thead className="bg-zinc-50">
                            <tr className="text-left">
                                <th className="p-3 font-medium w-48">Параметр</th>
                                {selected.map((s) => (
                                    <th key={s.id} className="p-3 font-medium">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="font-semibold">{s.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {categoryRu[s.category] ?? s.category}
                                                    {s.subcategory ? ` • ${s.subcategory}` : ""}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(s.id)}
                                                className="text-xs px-2 py-1 rounded bg-zinc-100"
                                            >
                                                убрать
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            </thead>

                            <tbody className="divide-y">
                            <tr>
                                <td className="p-3 font-medium">Цена</td>
                                {selected.map((s) => (
                                    <td key={s.id} className="p-3">{s.price} ₽</td>
                                ))}
                            </tr>

                            <tr>
                                <td className="p-3 font-medium">Сроки</td>
                                {selected.map((s) => (
                                    <td key={s.id} className="p-3">
                                        {formatDays(s.min_days, s.max_days)}
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <td className="p-3 font-medium">Описание</td>
                                {selected.map((s) => (
                                    <td key={s.id} className="p-3">
                                        {s.description ?? "—"}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}
