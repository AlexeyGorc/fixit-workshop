"use client";

import { useMemo, useState } from "react";
import ServiceReviews from "@/app/components/ServiceReviews";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

const categoryRu: Record<string, string> = {
    household: "Техника",
    industrial: "Промышленность",
    custom_project: "Изготовление",
    restoration: "Реставрация",
};

const categories = ["Все", "Техника", "Промышленность", "Изготовление", "Реставрация"];

export default function ServicesClient({ services }: { services: Service[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [reviewsOpenId, setReviewsOpenId] = useState<number | null>(null);

    const filtered = useMemo(() => {
        if (selectedCategory === "Все") return services;
        return services.filter(
            (s) => (categoryRu[s.category] ?? s.category) === selectedCategory
        );
    }, [services, selectedCategory]);

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            {/* Header */}
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Мы предлагаем услуги по ремонту, реставрации и изготовлению изделий на заказ.
                </p>
            </section>

            {/* Filters */}
            <section>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setSelectedCategory(c)}
                            className={`px-4 py-2 rounded transition ${
                                selectedCategory === c
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-white"
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((s) => {
                        const duration =
                            s.min_days !== null || s.max_days !== null
                                ? `${s.min_days ?? "—"}–${s.max_days ?? "—"} дней`
                                : null;

                        const reviewsOpen = reviewsOpenId === s.id;

                        return (
                            <div
                                key={s.id}
                                className="bg-white text-black rounded shadow p-5 space-y-3"
                            >
                                <div className="text-sm text-gray-500">
                                    {categoryRu[s.category] ?? s.category}
                                </div>

                                <h3 className="text-xl font-semibold">{s.name}</h3>

                                {s.description ? (
                                    <p className="text-sm text-gray-700">{s.description}</p>
                                ) : null}

                                <div className="text-sm text-gray-600">
                                    Цена: <span className="font-medium">{s.price}</span>
                                    {duration ? (
                                        <span className="ml-3">Срок: {duration}</span>
                                    ) : null}
                                </div>

                                {/* Reviews link */}
                                <button
                                    onClick={() =>
                                        setReviewsOpenId(reviewsOpen ? null : s.id)
                                    }
                                    className="text-sm underline underline-offset-4 text-black hover:opacity-70"
                                >
                                    {reviewsOpen ? "Скрыть отзывы" : "Отзывы"}
                                </button>

                                {/* Reviews block */}
                                {reviewsOpen ? (
                                    <div className="pt-4 border-t">
                                        <ServiceReviews serviceId={s.id} />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
