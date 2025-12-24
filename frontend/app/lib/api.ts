export function getApiBaseUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
    return baseUrl;
}

export async function fetchJson<T>(path: string): Promise<T> {
    const baseUrl = getApiBaseUrl();

    const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
