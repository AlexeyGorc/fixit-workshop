'use client';

import { useState } from 'react';

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorText, setErrorText] = useState<string>('');

    const [subEmail, setSubEmail] = useState('');
    const [subStatus, setSubStatus] = useState<SubmitStatus>('idle');
    const [submittingSub, setSubmittingSub] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorText('');

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!baseUrl) throw new Error('NEXT_PUBLIC_API_URL is not set');

            const payload = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            };

            const res = await fetch(`${baseUrl}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let message = 'Произошла ошибка. Попробуйте позже.';
                try {
                    const data = await res.json();
                    if (data?.errors) {
                        const firstField = Object.keys(data.errors)[0];
                        message = data.errors[firstField]?.[0] ?? message;
                    }
                } catch {}
                throw new Error(message);
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', service: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (err: any) {
            setSubmitStatus('error');
            setErrorText(err?.message ?? 'Ошибка отправки');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();

        setSubmittingSub(true);
        setSubStatus('idle');

        const email = subEmail.trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!ok) {
            setSubStatus('error');
            setSubmittingSub(false);
            return;
        }

        setTimeout(() => {
            setSubEmail('');
            setSubStatus('success');
            setSubmittingSub(false);
            setTimeout(() => setSubStatus('idle'), 5000);
        }, 600);
    };

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Контакты</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы и помочь с выбором услуг.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📞</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Телефон</h3>
                                    <p className="text-gray-700">
                                        <a href="tel:+79991234567" className="hover:text-[#12c6dc] transition-colors">
                                            +7 (999) 123-45-67
                                        </a>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📧</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <p className="text-gray-700">
                                        <a href="mailto:info@fixitworkshop.ru" className="hover:text-[#12c6dc] transition-colors">
                                            info@fixitworkshop.ru
                                        </a>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Ответим в течение 24 часов</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📍</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Адрес</h3>
                                    <p className="text-gray-700">г. Москва, ул. Примерная, д. 12, офис 5</p>
                                    <p className="text-sm text-gray-500 mt-1">Метро: Примерная (5 минут пешком)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">💬</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Социальные сети</h3>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a href="https://t.me/fixitworkshop" target="_blank" rel="noopener noreferrer" className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm">Telegram</a>
                                        <a href="https://instagram.com/fixitworkshop" target="_blank" rel="noopener noreferrer" className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm">Instagram</a>
                                        <a href="https://vk.com/fixitworkshop" target="_blank" rel="noopener noreferrer" className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm">VK</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#00d6ef] rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-4">Режим работы</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="font-semibold">Понедельник - Пятница:</span><span>9:00 - 20:00</span></div>
                            <div className="flex justify-between"><span className="font-semibold">Суббота:</span><span>10:00 - 18:00</span></div>
                            <div className="flex justify-between"><span className="font-semibold">Воскресенье:</span><span>10:00 - 18:00</span></div>
                            <div className="mt-4 pt-4 border-t border-black/20"><p className="text-xs"><strong>Выходные дни:</strong> Новый год, 8 марта, 9 мая</p></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-4">Как добраться</h2>
                        <div className="space-y-3 text-sm">
                            <div><strong className="block mb-1">🚇 На метро:</strong><p className="text-gray-700">Станция метро "Примерная", выход №3. Идите прямо 200 метров, затем поверните направо.</p></div>
                            <div><strong className="block mb-1">🚌 На автобусе:</strong><p className="text-gray-700">Автобусы №123, 456 до остановки "Улица Примерная".</p></div>
                            <div><strong className="block mb-1">🚗 На машине:</strong><p className="text-gray-700">Парковка доступна рядом со зданием. Первые 2 часа бесплатно для клиентов.</p></div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-white rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-6">Обратная связь</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]" placeholder="Ваше имя" />
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]" placeholder="your@email.com" />
                            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc] resize-none" placeholder="Опишите вашу задачу или вопрос..." />

                            {submitStatus === 'success' && (<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">✅ Спасибо! Ваше сообщение отправлено.</div>)}
                            {submitStatus === 'error' && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">❌ {errorText}</div>)}

                            <button type="submit" disabled={isSubmitting} className="w-full bg-[#12c6dc] hover:bg-[#0da4b1] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                            </button>
                        </form>

                        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
                            <h3 className="text-xl font-bold mb-2">Подписка на рассылку</h3>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <input type="email" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} required className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]" placeholder="your@email.com" />
                                <button type="submit" disabled={submittingSub} className="bg-[#12c6dc] hover:bg-[#0da4b1] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                    {submittingSub ? '...' : 'Подписаться'}
                                </button>
                            </form>

                            {subStatus === 'success' && (<div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">✅ Вы подписаны</div>)}
                            {subStatus === 'error' && (<div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">❌ Некорректный email</div>)}
                        </div>
                    </div>
                </section>
            </div>

            <section className="bg-[#0da4b1] text-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div><h3 className="font-semibold mb-2">📋 Нужна ли предварительная запись?</h3><p className="text-sm opacity-90">Предварительная запись желательна, но не обязательна.</p></div>
                    <div><h3 className="font-semibold mb-2">💰 Можно ли оплатить картой?</h3><p className="text-sm opacity-90">Да, мы принимаем оплату наличными и картой.</p></div>
                    <div><h3 className="font-semibold mb-2">🚚 Есть ли выезд мастера на дом?</h3><p className="text-sm opacity-90">Да, предоставляем услугу выезда мастера.</p></div>
                    <div><h3 className="font-semibold mb-2">⏱️ Сколько времени занимает ремонт?</h3><p className="text-sm opacity-90">От 1 дня до 2 недель.</p></div>
                </div>
            </section>
        </main>
    );
}
