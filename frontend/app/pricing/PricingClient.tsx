"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import UniversalCalculator from "./UniversalCalculator";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    subcategory: string | null;
};

type PriceItem = {
    id: number;
    service_id: number;
    description: string;
    price: string | number;
    service: Service | null;
};

type Section = {
    title: string;
    items: Array<{
        id: number;
        title: string;
        price: string | number;
        subtitle?: string;
        serviceName?: string;
    }>;
};

const categorySectionTitle: Record<Service["category"], string> = {
    household: "Ремонт бытовых изделий",
    industrial: "Ремонт промышленных изделий",
    custom_project: "Индивидуальные проекты",
    restoration: "Реставрация",
};

function buildSections(items: PriceItem[]): Section[] {
    const byCategory = new Map<string, PriceItem[]>();
    for (const it of items) {
        const cat = it.service?.category ?? "household";
        if (!byCategory.has(cat)) byCategory.set(cat, []);
        byCategory.get(cat)!.push(it);
    }

    const order: Service["category"][] = [
        "household",
        "industrial",
        "custom_project",
        "restoration",
    ];

    const sections: Section[] = [];

    for (const cat of order) {
        const list = byCategory.get(cat) ?? [];
        if (!list.length) continue;

        sections.push({
            title: categorySectionTitle[cat],
            items: list.map((it) => ({
                id: it.id,
                title: it.description,
                price: it.price,
                subtitle: it.service?.subcategory ?? undefined,
                serviceName: it.service?.name ?? undefined,
            })),
        });
    }

    return sections;
}

export default function PricingClient({ items }: { items: PriceItem[] }) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return items;

        return items.filter((it) => {
            const desc = (it.description ?? "").toLowerCase();
            const name = (it.service?.name ?? "").toLowerCase();
            const sub = (it.service?.subcategory ?? "").toLowerCase();
            return desc.includes(s) || name.includes(s) || sub.includes(s);
        });
    }, [items, q]);

    const sections = useMemo(() => buildSections(filtered), [filtered]);

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Цены и калькуляторы</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Полный прайс-лист по услугам, плюс калькулятор для расчёта стоимости.
                </p>
            </section>

            <section className="max-w-xl mx-auto w-full">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Поиск по прайсу..."
                    className="w-full rounded px-4 py-3 bg-white text-black"
                />
            </section>

            {/* ПРАЙС: ТАБЛИЦЫ */}
            <section className="space-y-10">
                {sections.map((sec) => (
                    <div key={sec.title} className="space-y-4">
                        <h2 className="text-2xl font-semibold">{sec.title}</h2>

                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="min-w-full text-sm bg-white text-black">
                                <thead className="bg-zinc-100">
                                <tr className="text-left">
                                    <th className="px-4 py-3 font-medium">Позиция</th>
                                    <th className="px-4 py-3 font-medium">Подкатегория</th>
                                    <th className="px-4 py-3 font-medium text-right">Цена</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-200">
                                {sec.items.map((row) => (
                                    <tr key={row.id} className="align-top">
                                        <td className="px-4 py-3">
                                            <div className="font-medium">{row.title}</div>
                                            {row.serviceName ? (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {row.serviceName}
                                                </div>
                                            ) : null}
                                        </td>

                                        <td className="px-4 py-3 text-gray-700">
                                            {row.subtitle ?? "—"}
                                        </td>

                                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                                            {row.price} ₽
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </section>

            {/* ССЫЛКА НА COMPARE + КАЛЬКУЛЯТОР */}
            <section className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold">Калькулятор стоимости</h2>

                    <Link
                        href="/compare"
                        className="bg-white text-black rounded px-4 py-2 shadow"
                    >
                        Сравнить услуги
                    </Link>
                </div>

                <UniversalCalculator items={items} />
            </section>
        </main>
    );
}
