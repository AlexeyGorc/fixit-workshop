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

type OrderReq = {
    service_id?: number | null;
    name: string;
    email: string;
    phone?: string | null;
    details?: string | null;
    items: Array<{ price_id: number; qty: number }>;
    total: number;
};

type OrderResp = {
    id: number;
    order_status: string;
};

export default function UniversalCalculator({ items }: { items: PriceItem[] }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [query, setQuery] = useState("");
    const [cart, setCart] = useState<Record<number, number>>({});
    const [result, setResult] = useState<CalcResp | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string>("");

    // order modal state
    const [orderOpen, setOrderOpen] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderErr, setOrderErr] = useState<string>("");
    const [orderSuccess, setOrderSuccess] = useState<OrderResp | null>(null);

    const [orderForm, setOrderForm] = useState({
        name: "",
        email: "",
        phone: "",
        details: "",
    });

    const itemsById = useMemo(() => {
        const map = new Map<number, PriceItem>();
        for (const it of items) map.set(it.id, it);
        return map;
    }, [items]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items.slice(0, 20);

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
            .slice(0, 30);
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

    // ВАЖНО: определяем service_id из корзины
    const derivedServiceId: number | null = useMemo(() => {
        if (!cartRows.length) return null;

        const ids = new Set<number>();
        for (const row of cartRows) ids.add(row.item.service_id);

        // Если все позиции относятся к одной услуге — отправляем её id.
        // Если разные услуги — оставляем null (для учебного проекта так ок).
        return ids.size === 1 ? Array.from(ids)[0] : null;
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
                headers: { "Content-Type": "application/json" },
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

    function openOrder() {
        if (!result) {
            setErr("Сначала нажми «Рассчитать»");
            return;
        }
        setOrderErr("");
        setOrderSuccess(null);
        setOrderOpen(true);
    }

    function closeOrder() {
        setOrderOpen(false);
    }

    function onOrderChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setOrderForm((prev) => ({ ...prev, [name]: value }));
    }

    async function submitOrder() {
        if (!baseUrl) {
            setOrderErr("NEXT_PUBLIC_API_URL is not set");
            return;
        }
        if (!result) {
            setOrderErr("Нет результата расчёта");
            return;
        }
        if (!orderForm.name.trim()) {
            setOrderErr("Введите имя");
            return;
        }
        if (!orderForm.email.trim()) {
            setOrderErr("Введите email");
            return;
        }

        setOrderLoading(true);
        setOrderErr("");
        setOrderSuccess(null);

        const orderPayload: OrderReq = {
            service_id: derivedServiceId, // ✅ ДОБАВИЛИ
            name: orderForm.name.trim(),
            email: orderForm.email.trim(),
            phone: orderForm.phone.trim() || null,
            details: orderForm.details.trim() || null,
            items: payload.items,
            total: result.total,
        };

        try {
            const res = await fetch(`${baseUrl}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
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

            const data: OrderResp = await res.json();
            setOrderSuccess(data);

            // очищаем корзину и результат, чтобы пользователь понимал: заявка оформлена
            setCart({});
            setResult(null);
        } catch (e: any) {
            setOrderErr(e?.message ?? "Order error");
        } finally {
            setOrderLoading(false);
        }
    }

    return (
        <section className="space-y-4">
            <div className="bg-white text-black rounded shadow p-4 space-y-3">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Найти позицию прайса..."
                    className="w-full rounded px-3 py-2 border"
                />

                <div className="max-h-64 overflow-auto border rounded">
                    {filtered.map((it) => (
                        <div key={it.id} className="flex items-center gap-3 px-3 py-2 border-b">
                            <div className="flex-1">
                                <div className="font-medium">{it.description}</div>
                                <div className="text-xs text-gray-500">
                                    {it.service?.name}
                                    {it.service?.subcategory ? ` • ${it.service.subcategory}` : ""}
                                </div>
                            </div>

                            <div className="font-semibold whitespace-nowrap">{it.price} ₽</div>

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

                <div className="flex items-center gap-3">
                    <button
                        onClick={calc}
                        disabled={loading}
                        className="ml-auto px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                        type="button"
                    >
                        {loading ? "Считаю..." : "Рассчитать"}
                    </button>
                </div>

                {err ? <div className="text-sm text-red-600">{err}</div> : null}
            </div>

            <div className="bg-white text-black rounded shadow p-4 space-y-3">
                <h3 className="text-lg font-semibold">Выбранные позиции</h3>

                {cartRows.length === 0 ? (
                    <div className="text-sm text-gray-600">Пока пусто</div>
                ) : (
                    <div className="space-y-2">
                        {cartRows.map(({ item, qty }) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="flex-1">
                                    <div className="font-medium">{item.description}</div>
                                    <div className="text-xs text-gray-500">{item.service?.name}</div>
                                </div>

                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={qty}
                                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                                    className="w-20 rounded px-2 py-1 border"
                                />

                                <button
                                    className="px-3 py-1 rounded bg-red-600 text-white"
                                    onClick={() => setQty(item.id, 0)}
                                    type="button"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {result ? (
                    <div className="pt-3 border-t space-y-2">
                        <div className="text-lg">
                            Итого: <b>{result.total} ₽</b>
                        </div>

                        <button
                            type="button"
                            onClick={openOrder}
                            className="px-4 py-2 rounded bg-black text-white"
                        >
                            Оформить заявку
                        </button>

                        {/* необязательное пояснение для отладки */}
                        <div className="text-xs text-gray-500">
                            service_id: <b>{derivedServiceId ?? "null"}</b>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* МОДАЛКА заказа (простая) */}
            {orderOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60" onClick={closeOrder} />
                    <div className="relative w-full max-w-lg bg-white text-black rounded shadow p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="text-xl font-semibold">Оформить заявку</h4>
                                <div className="text-sm text-gray-600 mt-1">
                                    Сумма: <b>{result?.total} ₽</b>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeOrder}
                                className="px-2 py-1 rounded bg-zinc-100"
                            >
                                ✕
                            </button>
                        </div>

                        {orderSuccess ? (
                            <div className="mt-4 space-y-2">
                                <div className="text-green-700 font-semibold">Заявка отправлена!</div>
                                <div className="text-sm">
                                    Номер заявки: <b>#{orderSuccess.id}</b>
                                </div>
                                <div className="text-sm">
                                    Статус: <b>{orderSuccess.order_status}</b>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeOrder}
                                        className="px-4 py-2 rounded bg-black text-white"
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mt-4 grid gap-3">
                                    <input
                                        name="name"
                                        value={orderForm.name}
                                        onChange={onOrderChange}
                                        placeholder="Имя *"
                                        className="w-full rounded px-3 py-2 border"
                                    />
                                    <input
                                        name="email"
                                        value={orderForm.email}
                                        onChange={onOrderChange}
                                        placeholder="Email *"
                                        className="w-full rounded px-3 py-2 border"
                                    />
                                    <input
                                        name="phone"
                                        value={orderForm.phone}
                                        onChange={onOrderChange}
                                        placeholder="Телефон (необязательно)"
                                        className="w-full rounded px-3 py-2 border"
                                    />
                                    <textarea
                                        name="details"
                                        value={orderForm.details}
                                        onChange={onOrderChange}
                                        placeholder="Комментарий к заявке (необязательно)"
                                        className="w-full rounded px-3 py-2 border min-h-[100px]"
                                    />
                                </div>

                                {orderErr ? (
                                    <div className="text-sm text-red-600 mt-3">{orderErr}</div>
                                ) : null}

                                <div className="mt-5 flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeOrder}
                                        className="px-4 py-2 rounded bg-zinc-100"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="button"
                                        onClick={submitOrder}
                                        disabled={orderLoading}
                                        className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                                    >
                                        {orderLoading ? "Отправляю..." : "Отправить"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
