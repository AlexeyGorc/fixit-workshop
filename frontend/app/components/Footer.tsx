import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-[#f7f7f7] text-black mt-20">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">FixIt Workshop</h3>
                    <p className="text-sm max-w-xs">
                        Качественный ремонт и индивидуальные изделия под заказ с гарантией.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Контакты</h4>
                    <ul className="text-sm space-y-1">
                        <li>Телефон: +7 (999) 123-45-67</li>
                        <li>Email: info@fixitworkshop.ru</li>
                        <li>Telegram: @fixitworkshop</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Навигация</h4>
                    <ul className="text-sm space-y-1">
                        <li><Link href="/" className="hover:underline">Главная</Link></li>
                        <li><Link href="/profile" className="hover:underline">Личный кабинет</Link></li>
                        <li><Link href="/services" className="hover:underline">Услуги</Link></li>
                        <li><Link href="/pricing" className="hover:underline">Цены</Link></li>
                        <li><Link href="/about" className="hover:underline">О нас</Link></li>
                        <li><Link href="/contacts" className="hover:underline">Контакты</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
