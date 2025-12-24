import ProjectsClient from "./ProjectsClient";

export type Service = {
    id: number;
    name: string;
    category: string;
    subcategory: string | null;
};

export type Project = {
    id: number;
    service_id: number;
    name: string;
    description: string | null;
    image_url: string | null;
    created_at: string;
    service: Service | null;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export default async function ProjectsPage({
                                               searchParams,
                                           }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");

    const qs = new URLSearchParams();
    qs.set("per_page", "12");
    if (typeof searchParams.page === "string") qs.set("page", searchParams.page);
    if (typeof searchParams.category === "string") qs.set("category", searchParams.category);
    if (typeof searchParams.service_id === "string") qs.set("service_id", searchParams.service_id);
    if (typeof searchParams.q === "string") qs.set("q", searchParams.q);

    const res = await fetch(`${baseUrl}/projects?${qs.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch projects");

    const payload: Paginated<Project> = await res.json();

    return <ProjectsClient payload={payload} />;
}
