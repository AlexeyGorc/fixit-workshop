"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { apiMe, type UserMe } from "@/app/lib/authApi";
import { getToken } from "@/app/lib/authToken";

export default function Header() {
    const [me, setMe] = useState<UserMe | null>(null);

    async function loadMe() {
        const token = getToken();
        if (!token) {
            setMe(null);
            return;
        }

        try {
            const u = await apiMe();
            setMe(u);
        } catch {
            setMe(null);
        }
    }

    useEffect(() => {
        loadMe();

        // обновляем хедер, если токен менялся (вкладки/после логина)
        const onStorage = () => loadMe();
        window.addEventListener("storage", onStorage);

        return () => window.removeEventListener("storage", onStorage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logoLink}>
                    <Image src="/logo.svg" alt="FixIt Workshop Logo" width={140} height={40} priority />
                </Link>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/projects">Примеры работ</Link></li>
                    <li><Link href="/services">Услуги</Link></li>
                    <li><Link href="/pricing">Цены и калькуляторы</Link></li>
                    <li><Link href="/about">О нас</Link></li>
                    <li><Link href="/contacts">Контакты</Link></li>

                    {me ? (
                        <li><Link href="/profile">Личный кабинет</Link></li>
                    ) : (
                        <li><Link href="/login">Вход</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
