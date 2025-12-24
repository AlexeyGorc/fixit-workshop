import { fetchJson } from "../lib/api";

type Service = {
    id: number;
    name: string;
    category: string;
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

type Paginated<T> = {
    data: T[];
};

const categoryRu: Record<string, string> = {
    household: "Бытовые изделия",
    industrial: "Промышленные изделия",
    custom_project: "Индивидуальные проекты",
    restoration: "Реставрация",
};

export default async function PopularServicesSection() {
    const payload = await fetchJson<Paginated<Service>>(`/services?per_page=6&sort=newest`);
    const services = payload.data.slice(0, 3);

    return (
        <section id="popular-services" className="px-4">
            <h2 className="text-2xl font-semibold mb-4">Популярные услуги</h2>
            <p className="mb-6 text-base">Наиболее востребованные направления среди клиентов:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((s) => (
                    <div key={s.id} className="bg-white rounded shadow p-4 text-black">
                        <div className="text-sm text-gray-500">{categoryRu[s.category] ?? s.category}</div>
                        <div className="font-semibold">{s.name}</div>
                        {s.description ? <p className="text-sm mt-2">{s.description}</p> : null}
                    </div>
                ))}
            </div>
        </section>
    );
}
