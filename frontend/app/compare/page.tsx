import CompareClient from "./CompareClient";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    subcategory: string | null;
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

type Paginated<T> = { data: T[] };

export default async function ComparePage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

    // берём побольше, чтобы на странице было из чего выбирать
    const res = await fetch(`${baseUrl}/services?per_page=100&sort=newest`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch services");

    const payload: Paginated<Service> = await res.json();

    return <CompareClient services={payload.data} />;
}
