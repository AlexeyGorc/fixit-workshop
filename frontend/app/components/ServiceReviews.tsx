"use client";

import { useEffect, useState } from "react";

type Review = {
    id: number;
    rating: number;
    content: string;
    created_at: string;
    user?: { id: number; name: string | null };
};

export default function ServiceReviews({ serviceId }: { serviceId: number }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [items, setItems] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // form
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");

    async function load() {
        if (!baseUrl) return;
        setLoading(true);
        setErr("");

        try {
            const res = await fetch(`${baseUrl}/reviews?service_id=${serviceId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setItems(data.data ?? []);
        } catch (e: any) {
            setErr(e?.message ?? "Load error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceId]);

    async function submit() {
        if (!baseUrl) return;
        if (!content.trim()) {
            setErr("Напиши текст отзыва");
            return;
        }

        setErr("");

        const res = await fetch(`${baseUrl}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // для Sanctum cookie auth (на следующем этапе)
            body: JSON.stringify({
                service_id: serviceId,
                rating,
                content: content.trim(),
            }),
        });

        if (!res.ok) {
            const text = await res.text();
            setErr(text.slice(0, 200) || `HTTP ${res.status}`);
            return;
        }

        setContent("");
        await load();
    }

    return (
        <div className="bg-white text-black rounded shadow p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Отзывы</h3>
                <button onClick={load} className="px-3 py-1 rounded bg-zinc-100">
                    Обновить
                </button>
            </div>

            {loading ? <div className="text-sm text-zinc-500">Загрузка…</div> : null}
            {err ? <div className="text-sm text-red-600">{err}</div> : null}

            <div className="space-y-3">
                {items.length === 0 ? (
                    <div className="text-sm text-zinc-600">Пока нет отзывов</div>
                ) : (
                    items.map((r) => (
                        <div key={r.id} className="border rounded p-3">
                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                                <div className="font-medium text-zinc-900">{r.user?.name ?? "Пользователь"}</div>
                                <div>•</div>
                                <div>⭐ {r.rating}/5</div>
                                <div>•</div>
                                <div>{new Date(r.created_at).toISOString().slice(0, 10)}</div>
                            </div>
                            <div className="mt-2 text-sm">{r.content}</div>
                        </div>
                    ))
                )}
            </div>

            <div className="pt-3 border-t space-y-2">
                <div className="text-sm font-semibold">Оставить отзыв (только после авторизации)</div>

                <div className="flex items-center gap-2">
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {[5, 4, 3, 2, 1].map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>

                    <input
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Текст отзыва..."
                        className="flex-1 border rounded px-3 py-2"
                    />

                    <button onClick={submit} className="px-4 py-2 rounded bg-black text-white">
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}
