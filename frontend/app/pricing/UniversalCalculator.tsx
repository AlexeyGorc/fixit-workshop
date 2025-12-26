"use client";

import { useMemo, useState } from "react";

type Service = {
    id: number;
    name: string;
    category: string;
    subcategory: string | null;
};

export type PriceItem = {
    id: number;
    service_id: number;
    description: string;
    price: string | number;
    service: Service | null;
};

type CalcReq = {
    items: Array<{ price_id: number; qty: number }>;
};

type CalcResp = {
    total: number;
    breakdown: Array<{
        price_id: number;
        description: string;
        unit_price: number;
        qty: number;
        line_total: number;
        service?: Service | null;
    }>;
};

export default function UniversalCalculator({ items }: { items: PriceItem[] }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [query, setQuery] = useState("");
    const [cart, setCart] = useState<Record<number, number>>({});
    const [result, setResult] = useState<CalcResp | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string>("");

    const itemsById = useMemo(() => {
        const map = new Map<number, PriceItem>();
        for (const it of items) map.set(it.id, it);
        return map;
    }, [items]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items.slice(0, 40);

        return items
            .filter((it) => {
                const s = it.service?.name?.toLowerCase() ?? "";
                const sub = it.service?.subcategory?.toLowerCase() ?? "";
                return (
                    it.description.toLowerCase().includes(q) ||
                    s.includes(q) ||
                    sub.includes(q)
                );
            })
            .slice(0, 60);
    }, [items, query]);

    const cartRows = useMemo(() => {
        return Object.entries(cart)
            .map(([priceId, qty]) => {
                const id = Number(priceId);
                const item = itemsById.get(id);
                if (!item) return null;
                return { item, qty };
            })
            .filter(Boolean) as Array<{ item: PriceItem; qty: number }>;
    }, [cart, itemsById]);

    const payload: CalcReq = useMemo(() => {
        return {
            items: cartRows.map(({ item, qty }) => ({
                price_id: item.id,
                qty,
            })),
        };
    }, [cartRows]);

    function add(priceId: number) {
        setCart((prev) => ({ ...prev, [priceId]: (prev[priceId] ?? 0) + 1 }));
        setResult(null);
        setErr("");
    }

    function setQty(priceId: number, qty: number) {
        setCart((prev) => {
            if (qty <= 0 || Number.isNaN(qty)) {
                const next = { ...prev };
                delete next[priceId];
                return next;
            }
            return { ...prev, [priceId]: qty };
        });
        setResult(null);
        setErr("");
    }

    function reset() {
        setCart({});
        setResult(null);
        setErr("");
        setQuery("");
    }

    async function calc() {
        if (!baseUrl) {
            setErr("NEXT_PUBLIC_API_URL is not set");
            return;
        }

        if (!payload.items.length) {
            setErr("Добавь хотя бы одну позицию");
            return;
        }

        setLoading(true);
        setErr("");
        setResult(null);

        try {
            const res = await fetch(`${baseUrl}/calc/universal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const contentType = res.headers.get("content-type") ?? "";
                if (contentType.includes("application/json")) {
                    const data = await res.json().catch(() => null);
                    throw new Error(
                        data?.message ??
                        (data?.errors
                            ? JSON.stringify(data.errors)
                            : `HTTP ${res.status}`)
                    );
                } else {
                    const text = await res.text();
                    throw new Error(text.slice(0, 300) || `HTTP ${res.status}`);
                }
            }

            const data: CalcResp = await res.json();
            setResult(data);
        } catch (e: any) {
            setErr(e?.message ?? "Calc error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="space-y-4">
            {/* поиск + прайс */}
            <div className="bg-white text-black rounded shadow p-4 space-y-3">
                <div className="flex flex-col gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Найти позицию прайса..."
                        className="w-full rounded px-3 py-2 border"
                    />

                    <div className="flex items-center gap-2">
                        <button
                            onClick={reset}
                            type="button"
                            className="px-3 py-2 rounded bg-zinc-100"
                        >
                            Сбросить
                        </button>

                        <button
                            onClick={calc}
                            disabled={loading}
                            className="ml-auto px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                            type="button"
                        >
                            {loading ? "Считаю..." : "Рассчитать"}
                        </button>
                    </div>
                </div>

                {err ? <div className="text-sm text-red-600">{err}</div> : null}

                <div className="max-h-72 overflow-auto border rounded">
                    {filtered.map((it) => (
                        <div
                            key={it.id}
                            className="flex items-center gap-3 px-3 py-2 border-b"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">
                                    {it.description}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {it.service?.name}
                                    {it.service?.subcategory
                                        ? ` • ${it.service.subcategory}`
                                        : ""}
                                </div>
                            </div>

                            <div className="font-semibold whitespace-nowrap">
                                {it.price} ₽
                            </div>

                            <button
                                className="px-3 py-1 rounded bg-black text-white"
                                onClick={() => add(it.id)}
                                type="button"
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* корзина */}
            <div className="bg-white text-black rounded shadow p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Выбранные позиции</h3>
                    <div className="text-sm text-gray-600">
                        {cartRows.length ? `Позиций: ${cartRows.length}` : "Пусто"}
                    </div>
                </div>

                {cartRows.length === 0 ? (
                    <div className="text-sm text-gray-600">Пока пусто</div>
                ) : (
                    <div className="space-y-2">
                        {cartRows.map(({ item, qty }) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">
                                        {item.description}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {item.service?.name}
                                    </div>
                                </div>

                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={qty}
                                    onChange={(e) =>
                                        setQty(item.id, Number(e.target.value))
                                    }
                                    className="w-20 rounded px-2 py-1 border"
                                />

                                <button
                                    className="px-3 py-1 rounded bg-red-600 text-white"
                                    onClick={() => setQty(item.id, 0)}
                                    type="button"
                                    title="Удалить"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* результат */}
                {result ? (
                    <div className="pt-3 border-t space-y-2">
                        <div className="text-lg">
                            Итого: <b>{result.total} ₽</b>
                        </div>

                        {/* breakdown (можно убрать, если не нужен) */}
                        {result.breakdown?.length ? (
                            <div className="text-sm text-gray-700 space-y-1">
                                {result.breakdown.map((b) => (
                                    <div
                                        key={b.price_id}
                                        className="flex justify-between gap-4"
                                    >
                                        <div className="min-w-0 truncate">
                                            {b.description} × {b.qty}
                                        </div>
                                        <div className="whitespace-nowrap font-medium">
                                            {b.line_total} ₽
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
