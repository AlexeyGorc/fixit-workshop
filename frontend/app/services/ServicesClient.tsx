"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getToken } from "@/app/lib/authToken";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

type OrderResp = { id: number; order_status: string };

const categoryRu: Record<string, string> = {
    household: "Техника",
    industrial: "Промышленность",
    custom_project: "Изготовление",
    restoration: "Реставрация",
};

const categories = ["Все", "Техника", "Промышленность", "Изготовление", "Реставрация"];

export default function ServicesClient({ services }: { services: Service[] }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [selectedCategory, setSelectedCategory] = useState("Все");

    /* ===== HYDRATION SAFE AUTH ===== */
    const [token, setToken] = useState<string | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        setToken(getToken());
    }, []);

    const isAuthed = isHydrated && !!token;

    /* ===== FAVORITES ===== */
    const [favIds, setFavIds] = useState<Set<number>>(new Set());
    const [favErr, setFavErr] = useState("");

    useEffect(() => {
        async function loadFav() {
            if (!isHydrated || !baseUrl || !token) return;

            try {
                const res = await fetch(`${baseUrl}/favorites`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) return;

                const data = await res.json();
                const ids = Array.isArray(data?.service_ids) ? data.service_ids : [];
                setFavIds(new Set(ids.map(Number)));
            } catch {
                /* ignore */
            }
        }

        loadFav();
    }, [isHydrated, baseUrl, token]);

    async function toggleFavorite(serviceId: number) {
        setFavErr("");

        if (!isAuthed || !token) {
            setFavErr("Избранное доступно после входа");
            return;
        }
        if (!baseUrl) return;

        setFavIds((prev) => {
            const next = new Set(prev);
            next.has(serviceId) ? next.delete(serviceId) : next.add(serviceId);
            return next;
        });

        try {
            const res = await fetch(`${baseUrl}/favorites/toggle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ service_id: serviceId }),
            });

            if (!res.ok) throw new Error();
        } catch {
            setFavErr("Ошибка избранного");
        }
    }

    /* ===== FILTER / GROUP ===== */
    const filtered = useMemo(() => {
        if (selectedCategory === "Все") return services;
        return services.filter(
            (s) => (categoryRu[s.category] ?? s.category) === selectedCategory
        );
    }, [services, selectedCategory]);

    const grouped = useMemo(() => {
        const map = new Map<string, Service[]>();
        for (const s of filtered) {
            const key = categoryRu[s.category] ?? s.category;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(s);
        }
        return Array.from(map.entries());
    }, [filtered]);

    function durationText(s: Service) {
        if (s.min_days === null && s.max_days === null) return "—";
        return `${s.min_days ?? "—"}–${s.max_days ?? "—"} дн.`;
    }

    /* ===== ORDERS ===== */
    async function createOrderAuthed(serviceId: number) {
        if (!baseUrl || !token) return;

        try {
            const res = await fetch(`${baseUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ service_id: serviceId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.message);

            alert(`Заявка отправлена! #${data.id}`);
        } catch {
            alert("Ошибка отправки заявки");
        }
    }

    /* ===== RENDER ===== */
    return (
        <main className="flex flex-col gap-10 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Мы предлагаем услуги по ремонту, реставрации и изготовлению изделий на заказ.
                </p>
            </section>

            <section>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`px-4 py-2 rounded ${
                                selectedCategory === c
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-white"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {favErr && <div className="text-sm text-red-600 mb-4">{favErr}</div>}

                <div className="space-y-10">
                    {grouped.map(([cat, rows]) => (
                        <section key={cat}>
                            <h2 className="text-2xl font-semibold mb-3">{cat}</h2>

                            <div className="overflow-x-auto bg-white text-black rounded">
                                <table className="min-w-full text-sm">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-3">Услуга</th>
                                        <th className="px-4 py-3">Описание</th>
                                        <th className="px-4 py-3">Срок</th>
                                        <th className="px-4 py-3">Цена</th>
                                        <th className="px-4 py-3">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows.map((s) => {
                                        const isFav = favIds.has(s.id);

                                        return (
                                            <tr key={s.id} className="border-t">
                                                <td className="px-4 py-3 font-medium">{s.name}</td>
                                                <td className="px-4 py-3">{s.description ?? "—"}</td>
                                                <td className="px-4 py-3">{durationText(s)}</td>
                                                <td className="px-4 py-3 font-semibold">
                                                    {s.price} ₽
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-3 items-center">
                                                        <Link
                                                            href={`/services/${s.id}/reviews`}
                                                            className="underline"
                                                        >
                                                            Отзывы
                                                        </Link>

                                                        {isAuthed ? (
                                                            <button
                                                                onClick={() => createOrderAuthed(s.id)}
                                                                className="px-3 py-1.5 bg-black text-white rounded"
                                                            >
                                                                Заказать
                                                            </button>
                                                        ) : (
                                                            <Link
                                                                href="/login"
                                                                className="px-3 py-1.5 bg-black text-white rounded"
                                                            >
                                                                Войти
                                                            </Link>
                                                        )}

                                                        <button
                                                            onClick={() => toggleFavorite(s.id)}
                                                            className="px-3 py-1.5 bg-zinc-100 rounded"
                                                        >
                                                            {isFav ? "★" : "☆"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        </main>
    );
}
