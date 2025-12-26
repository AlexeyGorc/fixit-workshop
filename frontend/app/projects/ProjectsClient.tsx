"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Project } from "./page";

const categoryRu: Record<string, string> = {
    household: "Бытовые изделия",
    industrial: "Промышленные изделия",
    custom_project: "Индивидуальные проекты",
    restoration: "Реставрация",
};

export default function ProjectsClient({
                                           payload,
                                       }: {
    payload: {
        data: Project[];
        current_page: number;
        last_page: number;
        total: number;
    };
}) {
    const router = useRouter();
    const sp = useSearchParams();

    const [q, setQ] = useState(sp.get("q") ?? "");
    const currentCategory = sp.get("category") ?? "";
    const currentPage = payload.current_page;

    const categories = useMemo(
        () => [
            { value: "", label: "Все" },
            { value: "household", label: categoryRu.household },
            { value: "industrial", label: categoryRu.industrial },
            { value: "custom_project", label: categoryRu.custom_project },
            { value: "restoration", label: categoryRu.restoration },
        ],
        []
    );

    function setParam(key: string, value: string) {
        const next = new URLSearchParams(sp.toString());
        if (value) next.set(key, value);
        else next.delete(key);
        next.delete("page");
        router.push(`/projects?${next.toString()}`);
    }

    function submitSearch() {
        setParam("q", q.trim());
    }

    function goPage(page: number) {
        const next = new URLSearchParams(sp.toString());
        next.set("page", String(page));
        router.push(`/projects?${next.toString()}`);
    }

    return (
        <main className="py-12 px-4 space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-3">Примеры работ</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Реальные проекты, которые мы уже выполняли. Фильтруй по категориям и ищи по названию.
                </p>
            </section>

            <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 items-center">
                    <select
                        value={currentCategory}
                        onChange={(e) => setParam("category", e.target.value)}
                        className="bg-white text-black rounded px-3 py-2"
                    >
                        {categories.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>

                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Поиск проекта..."
                        className="bg-white text-black rounded px-3 py-2 w-64"
                    />
                    <button onClick={submitSearch} className="bg-white text-black rounded px-3 py-2">
                        Найти
                    </button>
                </div>

                <div className="text-sm opacity-80">Всего: {payload.total}</div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {payload.data.map((p) => (
                    <article key={p.id} className="bg-white text-black rounded shadow overflow-hidden">
                        {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-full h-48 object-cover" />
                        ) : (
                            <div className="w-full h-48 bg-zinc-200" />
                        )}

                        <div className="p-4 space-y-2">
                            <div className="text-xs text-gray-500">
                                {p.service ? categoryRu[p.service.category] ?? p.service.category : "—"}
                                {p.service?.subcategory ? ` • ${p.service.subcategory}` : ""}
                            </div>

                            <h3 className="text-xl font-semibold">{p.name}</h3>
                            {p.description ? <p className="text-sm">{p.description}</p> : null}
                        </div>
                    </article>
                ))}
            </section>

            <section className="flex justify-center gap-2">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => goPage(currentPage - 1)}
                    className="px-3 py-2 rounded bg-white text-black disabled:opacity-50"
                >
                    Назад
                </button>
                <div className="px-3 py-2">{currentPage} / {payload.last_page}</div>
                <button
                    disabled={currentPage >= payload.last_page}
                    onClick={() => goPage(currentPage + 1)}
                    className="px-3 py-2 rounded bg-white text-black disabled:opacity-50"
                >
                    Вперёд
                </button>
            </section>
        </main>
    );
}
