import PricingClient from "./PricingClient";

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

type Paginated<T> = { data: T[] };

export default async function PricingPage() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

    const res = await fetch(`${baseUrl}/prices?per_page=200`, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch prices");

    const payload: Paginated<PriceItem> = await res.json();

    return <PricingClient items={payload.data} />;
}
