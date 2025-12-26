"use client";

import { useEffect, useState } from "react";
import { apiLogin, apiMe, apiRegister, apiLogout, type UserMe } from "@/app/lib/authApi";
import Link from "next/link";

type Mode = "login" | "register";

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>("login");

    const [me, setMe] = useState<UserMe | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    // login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // register form
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    async function loadMe() {
        setErr("");
        try {
            const u = await apiMe();
            setMe(u);
        } catch {
            setMe(null);
        }
    }

    useEffect(() => {
        loadMe();
    }, []);

    async function submit() {
        setErr("");

        try {
            setLoading(true);

            if (mode === "login") {
                if (!email.trim() || !password.trim()) {
                    setErr("Введите email и пароль");
                    return;
                }
                await apiLogin({ email: email.trim(), password });
            } else {
                if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
                    setErr("Заполните имя, email, телефон и пароль");
                    return;
                }
                await apiRegister({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    password,
                });
            }

            await loadMe();
        } catch (e: any) {
            setErr(e?.message ?? "Ошибка");
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setLoading(true);
        setErr("");
        try {
            await apiLogout();
            setMe(null);
        } catch (e: any) {
            setErr(e?.message ?? "Ошибка выхода");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-xl mx-auto p-6 space-y-4">
            <h1 className="text-3xl font-bold">Аккаунт</h1>

            {me ? (
                <div className="bg-white text-black rounded shadow p-4 space-y-2">
                    <div className="text-sm text-zinc-600">Вы вошли</div>
                    <div className="font-semibold">{me.name}</div>
                    <div className="text-sm">{me.email}</div>
                    <div className="text-sm">{me.phone ?? "—"}</div>

                    <div className="pt-3 flex gap-3">
                        <Link className="underline" href="/profile">
                            Перейти в личный кабинет →
                        </Link>

                        <button
                            onClick={logout}
                            disabled={loading}
                            className="ml-auto px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                            type="button"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white text-black rounded shadow p-4 space-y-3">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={`px-3 py-2 rounded ${mode === "login" ? "bg-black text-white" : "bg-zinc-100"}`}
                        >
                            Вход
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("register")}
                            className={`px-3 py-2 rounded ${mode === "register" ? "bg-black text-white" : "bg-zinc-100"}`}
                        >
                            Регистрация
                        </button>
                    </div>

                    {mode === "register" ? (
                        <>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Имя"
                                className="w-full border rounded px-3 py-2"
                            />
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Телефон"
                                className="w-full border rounded px-3 py-2"
                            />
                        </>
                    ) : null}

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border rounded px-3 py-2"
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        type="password"
                        className="w-full border rounded px-3 py-2"
                    />

                    {err ? <div className="text-sm text-red-600">{err}</div> : null}

                    <button
                        onClick={submit}
                        disabled={loading}
                        className="w-full px-4 py-2 rounded bg-black text-white disabled:opacity-50"
                        type="button"
                    >
                        {loading ? "..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
                    </button>
                </div>
            )}
        </main>
    );
}
