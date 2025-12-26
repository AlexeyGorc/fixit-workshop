"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/lib/authToken";
import { apiLogout } from "@/app/lib/authApi";

type ProfileUser = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    created_at: string | null;
};

type Order = {
    id: number;
    order_status: "pending" | "confirmed" | "completed" | "cancelled";
    order_date: string | null;
    total: string | number;
    service?: { id: number; name: string } | null;
};

type OrdersResp = {
    data: Order[];
    links?: any;
    meta?: any;
};

type FavoriteService = {
    id: number;
    name: string;
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
    category?: string;
};

function fmtDate(isoOrDate: string | null) {
    if (!isoOrDate) return "—";
    const d = new Date(isoOrDate);
    if (Number.isNaN(d.getTime())) return String(isoOrDate).slice(0, 10);
    return d.toISOString().slice(0, 10);
}

function statusRu(s: Order["order_status"]) {
    switch (s) {
        case "pending":
            return { label: "ожидается", cls: "text-gray-500" };
        case "confirmed":
            return { label: "в процессе", cls: "text-yellow-600" };
        case "completed":
            return { label: "завершён", cls: "text-green-600" };
        case "cancelled":
            return { label: "отменён", cls: "text-red-600" };
        default:
            return { label: s, cls: "text-gray-500" };
    }
}

function fmtDuration(min: number | null, max: number | null) {
    if (min === null && max === null) return "—";
    return `${min ?? "—"}–${max ?? "—"} дн.`;
}

export default function ProfilePage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const [user, setUser] = useState<ProfileUser | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // edit mode
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [saveErr, setSaveErr] = useState("");

    const [favorites, setFavorites] = useState<FavoriteService[]>([]);
    const [favLoading, setFavLoading] = useState(false);
    const [favErr, setFavErr] = useState("");

    useEffect(() => {
        setToken(getToken());
        setMounted(true);
    }, []);

    async function apiFetch(path: string, init?: RequestInit) {
        if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

        const headers: Record<string, string> = {
            Accept: "application/json",
            ...(init?.headers as any),
        };

        if (token) headers.Authorization = `Bearer ${token}`;

        return fetch(`${baseUrl}${path}`, { ...init, headers });
    }

    async function loadFavorites() {
        setFavErr("");
        setFavLoading(true);

        try {
            if (!token) {
                setFavorites([]);
                return;
            }

            const res = await apiFetch(`/favorites`);
            if (!res.ok) {
                const j = await res.json().catch(() => null);
                throw new Error(j?.message ?? `Favorites HTTP ${res.status}`);
            }

            const data = await res.json().catch(() => null);

            // поддержим разные варианты ответа
            const list =
                (Array.isArray(data?.services) ? data.services : null) ??
                (Array.isArray(data?.data) ? data.data : null) ??
                (Array.isArray(data) ? data : null) ??
                [];

            setFavorites(list);
        } catch (e: any) {
            setFavErr(e?.message ?? "Favorites load error");
        } finally {
            setFavLoading(false);
        }
    }

    async function removeFromFavorites(serviceId: number) {
        setFavErr("");

        if (!token) {
            setFavErr("Избранное доступно после входа");
            return;
        }

        const prev = favorites;
        setFavorites((x) => x.filter((s) => s.id !== serviceId));

        try {
            const res = await apiFetch(`/favorites/toggle`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ service_id: serviceId }),
            });

            if (!res.ok) {
                const j = await res.json().catch(() => null);
                throw new Error(j?.message ?? `HTTP ${res.status}`);
            }
        } catch (e: any) {
            setFavorites(prev);
            setFavErr(e?.message ?? "Ошибка избранного");
        }
    }

    async function loadAll() {
        setLoading(true);
        setErr("");

        try {
            const r1 = await apiFetch(`/profile`);
            if (!r1.ok) {
                const j = await r1.json().catch(() => null);
                throw new Error(j?.message ?? `Profile HTTP ${r1.status}`);
            }
            const p = await r1.json();
            const u: ProfileUser = p.user;
            setUser(u);

            const r2 = await apiFetch(`/profile/orders`);
            if (!r2.ok) {
                const j = await r2.json().catch(() => null);
                throw new Error(j?.message ?? `Orders HTTP ${r2.status}`);
            }
            const o: OrdersResp = await r2.json();
            setOrders(o.data ?? []);

            setForm({
                name: u?.name ?? "",
                email: u?.email ?? "",
                phone: u?.phone ?? "",
            });

            await loadFavorites();
        } catch (e: any) {
            setErr(e?.message ?? "Load error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!mounted) return;
        loadAll();
    }, [mounted]);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function logout() {
        try {
            await apiLogout();
        } catch {
        } finally {
            setToken(null);
            setUser(null);
            setOrders([]);
            setFavorites([]);
            setErr("");
            setSaveErr("");
            setFavErr("");
            router.push("/login");
        }
    }

    async function saveProfile() {
        setSaving(true);
        setSaveErr("");

        try {
            const res = await apiFetch(`/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim() || null,
                }),
            });

            if (!res.ok) {
                const j = await res.json().catch(() => null);
                if (j?.errors) {
                    const firstKey = Object.keys(j.errors)[0];
                    throw new Error(j.errors[firstKey]?.[0] ?? j.message ?? "Ошибка");
                }
                throw new Error(j?.message ?? `HTTP ${res.status}`);
            }

            const p = await res.json();
            const u: ProfileUser = p.user;
            setUser(u);
            setEditing(false);
        } catch (e: any) {
            setSaveErr(e?.message ?? "Save error");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="p-6 space-y-12">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-center flex-1">Личный кабинет</h1>
                <button
                    type="button"
                    onClick={logout}
                    disabled={!mounted}
                    className="px-4 py-2 rounded bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50"
                    title="Выйти"
                >
                    Выйти
                </button>
            </div>

            {loading ? <div className="text-center text-zinc-300">Загрузка…</div> : null}

            {err ? (
                <div className="mx-auto max-w-3xl bg-red-50 text-red-800 border border-red-200 p-4 rounded">
                    {err}
                </div>
            ) : null}

            <section id="profile" className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Профиль</h2>

                {!user ? (
                    <div className="text-gray-700">Нет данных профиля</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-200 rounded">
                                <tbody>
                                <tr className="border-b">
                                    <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">
                                        ФИО
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">
                                        {editing ? (
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={onChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Email</td>
                                    <td className="px-4 py-3 text-gray-800">
                                        {editing ? (
                                            <input
                                                name="email"
                                                value={form.email}
                                                onChange={onChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Телефон</td>
                                    <td className="px-4 py-3 text-gray-800">
                                        {editing ? (
                                            <input
                                                name="phone"
                                                value={form.phone}
                                                onChange={onChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        ) : (
                                            user.phone ?? "—"
                                        )}
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Адрес</td>
                                    <td className="px-4 py-3 text-gray-800">—</td>
                                </tr>

                                <tr>
                                    <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">
                                        Дата регистрации
                                    </td>
                                    <td className="px-4 py-3 text-gray-800">{fmtDate(user.created_at)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-5 rounded"
                                >
                                    ✏️ Редактировать профиль
                                </button>
                            ) : (
                                <>
                                    <button
                                        disabled={saving}
                                        onClick={saveProfile}
                                        className="bg-black hover:bg-zinc-800 text-white font-medium py-2 px-5 rounded disabled:opacity-50"
                                    >
                                        {saving ? "Сохранение…" : "💾 Сохранить"}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setSaveErr("");
                                            setForm({
                                                name: user.name ?? "",
                                                email: user.email ?? "",
                                                phone: user.phone ?? "",
                                            });
                                        }}
                                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium py-2 px-5 rounded"
                                    >
                                        Отмена
                                    </button>
                                </>
                            )}
                        </div>

                        {saveErr ? <div className="mt-3 text-sm text-red-600">{saveErr}</div> : null}
                    </>
                )}
            </section>

            <section id="orders" className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">История заказов</h2>

                {orders.length === 0 ? (
                    <div className="border p-4 rounded bg-white shadow text-gray-700">Пока нет заказов</div>
                ) : (
                    <ul className="space-y-3">
                        {orders.map((o) => {
                            const st = statusRu(o.order_status);
                            const serviceName = o.service?.name ?? "—";
                            return (
                                <li key={o.id} className="border p-4 rounded bg-white shadow text-gray-900">
                                    <span className="font-medium">#{o.id}</span> — {serviceName} —{" "}
                                    {fmtDate(o.order_date)}
                                    <span className={`ml-2 text-sm ${st.cls}`}>({st.label})</span>

                                    <div className="mt-1 text-sm text-gray-700">
                                        Сумма: <b>{o.total}</b>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            <section id="favorites" className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold">Избранное</h2>
                    <button
                        type="button"
                        onClick={loadFavorites}
                        disabled={favLoading || !mounted}
                        className="px-3 py-2 rounded bg-zinc-100 text-zinc-900 disabled:opacity-50"
                    >
                        {favLoading ? "Обновляю…" : "Обновить"}
                    </button>
                </div>

                {favErr ? <div className="text-sm text-red-600">{favErr}</div> : null}

                {!mounted ? (
                    <div className="bg-white p-4 rounded shadow text-gray-700">Загрузка…</div>
                ) : !token ? (
                    <div className="bg-white p-4 rounded shadow text-gray-700">
                        Избранное доступно после входа.
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="bg-white p-4 rounded shadow text-gray-700">
                        Вы ещё ничего не добавили в избранное.
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full table-auto border border-gray-200">
                            <thead className="bg-gray-50">
                            <tr className="text-left">
                                <th className="px-4 py-3 font-semibold text-gray-700">Услуга</th>
                                <th className="px-4 py-3 font-semibold text-gray-700">Описание</th>
                                <th className="px-4 py-3 font-semibold text-gray-700">Срок</th>
                                <th className="px-4 py-3 font-semibold text-gray-700">Цена</th>
                                <th className="px-4 py-3 font-semibold text-gray-700">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {favorites.map((s) => (
                                <tr key={s.id} className="border-t align-top">
                                    <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                                    <td className="px-4 py-3 text-gray-700">{s.description ?? "—"}</td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {fmtDuration(s.min_days, s.max_days)}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                                        {s.price} ₽
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Link
                                                href={`/services/${s.id}/reviews`}
                                                className="underline underline-offset-4 hover:opacity-80"
                                            >
                                                Отзывы
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => removeFromFavorites(s.id)}
                                                className="px-3 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                                                title="Убрать из избранного"
                                            >
                                                Убрать ☆
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section id="notifications">
                <h2 className="text-xl font-semibold mb-2">Уведомления</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                    <li>📣 Новая акция: скидка 10% на ремонт ноутбуков</li>
                    <li>🔔 Ваши заказы отображаются в разделе «История заказов»</li>
                </ul>
            </section>

            <section id="recommendations">
                <h2 className="text-xl font-semibold mb-2">Рекомендации</h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                    <li className="border p-4 rounded bg-white shadow">
                        <h3 className="font-semibold mb-1">Чистка кондиционеров</h3>
                        <p className="text-sm text-gray-600">Рекомендуется для регулярного обслуживания</p>
                    </li>
                    <li className="border p-4 rounded bg-white shadow">
                        <h3 className="font-semibold mb-1">Профилактика ноутбука</h3>
                        <p className="text-sm text-gray-600">Полезно раз в 6–12 месяцев</p>
                    </li>
                </ul>
            </section>
        </div>
    );
}
