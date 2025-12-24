'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        src="/logo.svg"
                        alt="FixIt Workshop Logo"
                        width={140}
                        height={40}
                        priority
                    />
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
                    <li><Link href="/profile">Личный кабинет</Link></li>
                </ul>
            </nav>
        </header>
    );
}
