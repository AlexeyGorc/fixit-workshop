"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/app/lib/authToken";

type Review = {
    id: number;
    rating: number;
    content: string;
    created_at: string;
    user?: { id: number; name: string | null };
};

type Props = {
    serviceId: number;
    onCreated?: () => void;
};

export default function ServiceReviews({ serviceId, onCreated }: Props) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [items, setItems] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // form
    const [rating, setRating] = useState<number>(5);
    const [content, setContent] = useState<string>("");

    async function load() {
        if (!baseUrl) {
            setErr("NEXT_PUBLIC_API_URL is not set");
            return;
        }

        setLoading(true);
        setErr("");

        try {
            const res = await fetch(`${baseUrl}/reviews?service_id=${serviceId}`, {
                headers: { Accept: "application/json" },
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message ?? `HTTP ${res.status}`);
            }

            const data = await res.json().catch(() => null);
            setItems((data?.data ?? []) as Review[]);
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
        if (!baseUrl) {
            setErr("NEXT_PUBLIC_API_URL is not set");
            return;
        }

        const token = getToken();
        if (!token) {
            setErr("Нужно войти в аккаунт, чтобы оставить отзыв");
            return;
        }

        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
            setErr("Выберите оценку 1–5");
            return;
        }

        if (!content.trim()) {
            setErr("Введите текст отзыва");
            return;
        }

        setLoading(true);
        setErr("");

        try {
            const res = await fetch(`${baseUrl}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    service_id: serviceId,
                    rating,
                    content: content.trim(),
                }),
            });

            if (res.status === 401) {
                throw new Error("Нужно войти в аккаунт, чтобы оставить отзыв");
            }

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                const msg =
                    data?.message ??
                    (data?.errors ? JSON.stringify(data.errors) : null) ??
                    `HTTP ${res.status}`;
                throw new Error(msg);
            }

            setContent("");
            setRating(5);

            await load();
            onCreated?.();
        } catch (e: any) {
            setErr(e?.message ?? "Ошибка отправки");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white text-black rounded shadow p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Отзывы</h3>
                <button
                    onClick={load}
                    disabled={loading}
                    className="px-3 py-1 rounded bg-zinc-100 disabled:opacity-50"
                    type="button"
                >
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
                            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                                <div className="font-medium text-zinc-900">
                                    {r.user?.name ?? "Пользователь"}
                                </div>
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
                <div className="text-sm font-semibold">
                    Оставить отзыв (только после авторизации)
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="border rounded px-2 py-2"
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

                    <button
                        onClick={submit}
                        disabled={loading}
                        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                        type="button"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}
