import { getApiBaseUrl } from "@/app/lib/api";
import { getToken, setToken, clearToken } from "@/app/lib/authToken";

export type UserMe = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
};

export async function apiRegister(payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
}) {
    const base = getApiBaseUrl();

    const res = await fetch(`${base}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.message ?? "Ошибка регистрации");
    }

    if (data?.token) setToken(data.token);
    return data as { token: string; user: UserMe };
}

export async function apiLogin(payload: { email: string; password: string }) {
    const base = getApiBaseUrl();

    const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        // Laravel ValidationException может вернуть errors
        const msg =
            data?.message ??
            (data?.errors ? JSON.stringify(data.errors) : null) ??
            "Ошибка входа";
        throw new Error(msg);
    }

    if (data?.token) setToken(data.token);
    return data as { token: string; user: UserMe };
}

export async function apiMe(): Promise<UserMe> {
    const base = getApiBaseUrl();
    const token = getToken();
    if (!token) throw new Error("No token");

    const res = await fetch(`${base}/auth/me`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw new Error(data?.message ?? `HTTP ${res.status}`);
    }

    return data as UserMe;
}

export async function apiLogout() {
    const base = getApiBaseUrl();
    const token = getToken();

    // если токена нет — просто чистим
    if (!token) {
        clearToken();
        return { ok: true };
    }

    const res = await fetch(`${base}/auth/logout`, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    clearToken();

    const data = await res.json().catch(() => ({ ok: true }));
    return data;
}
