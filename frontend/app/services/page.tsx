import { fetchJson } from "../lib/api";
import ServicesClient from "./ServicesClient";

type Service = {
    id: number;
    name: string;
    category: "household" | "industrial" | "custom_project" | "restoration";
    description: string | null;
    price: string | number;
    min_days: number | null;
    max_days: number | null;
};

type Paginated<T> = { data: T[] };

export default async function ServicesPage() {
    const payload = await fetchJson<Paginated<Service>>(`/services?per_page=50&sort=newest`);
    return <ServicesClient services={payload.data} />;
}
