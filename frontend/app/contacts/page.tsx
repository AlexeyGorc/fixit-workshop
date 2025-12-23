'use client';

import { useState } from 'react';

export default function ContactsPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Имитация отправки формы
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                phone: '',
                email: '',
                service: '',
                message: '',
            });
            
            // Сброс статуса через 5 секунд
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Контакты</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы 
                    и помочь с выбором услуг.
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Контактная информация */}
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
                                    <p className="text-sm text-gray-500 mt-1">
                                        Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00
                                    </p>
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
                                    <p className="text-sm text-gray-500 mt-1">
                                        Ответим в течение 24 часов
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">📍</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Адрес</h3>
                                    <p className="text-gray-700">
                                        г. Москва, ул. Примерная, д. 12, офис 5
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Метро: Примерная (5 минут пешком)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-2xl">💬</div>
                                <div>
                                    <h3 className="font-semibold mb-1">Социальные сети</h3>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <a 
                                            href="https://t.me/fixitworkshop" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Telegram
                                        </a>
                                        <a 
                                            href="https://instagram.com/fixitworkshop" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Instagram
                                        </a>
                                        <a 
                                            href="https://vk.com/fixitworkshop" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="bg-[#12c6dc] hover:bg-[#0da4b1] text-white px-4 py-2 rounded-lg transition-colors text-sm"
                                        >
                                            VK
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Режим работы */}
                    <div className="bg-[#00d6ef] rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-4">Режим работы</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-semibold">Понедельник - Пятница:</span>
                                <span>9:00 - 20:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Суббота:</span>
                                <span>10:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Воскресенье:</span>
                                <span>10:00 - 18:00</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-black/20">
                                <p className="text-xs">
                                    <strong>Выходные дни:</strong> Новый год, 8 марта, 9 мая
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Как добраться */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-4">Как добраться</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <strong className="block mb-1">🚇 На метро:</strong>
                                <p className="text-gray-700">
                                    Станция метро "Примерная", выход №3. 
                                    Идите прямо 200 метров, затем поверните направо.
                                </p>
                            </div>
                            <div>
                                <strong className="block mb-1">🚌 На автобусе:</strong>
                                <p className="text-gray-700">
                                    Автобусы №123, 456 до остановки "Улица Примерная".
                                </p>
                            </div>
                            <div>
                                <strong className="block mb-1">🚗 На машине:</strong>
                                <p className="text-gray-700">
                                    Парковка доступна рядом со зданием. 
                                    Первые 2 часа бесплатно для клиентов.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Форма обратной связи */}
                <section>
                    <div className="bg-white rounded-lg shadow-md p-6 text-black">
                        <h2 className="text-2xl font-bold mb-6">Обратная связь</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block font-semibold mb-2">
                                    Имя <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]"
                                    placeholder="Ваше имя"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block font-semibold mb-2">
                                    Телефон <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]"
                                    placeholder="+7 (999) 123-45-67"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block font-semibold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="service" className="block font-semibold mb-2">
                                    Интересующая услуга
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc]"
                                >
                                    <option value="">Выберите услугу</option>
                                    <option value="repair-tech">Ремонт бытовой техники</option>
                                    <option value="repair-electronics">Ремонт электроники</option>
                                    <option value="repair-furniture">Ремонт мебели</option>
                                    <option value="custom-order">Изготовление на заказ</option>
                                    <option value="restoration">Реставрация</option>
                                    <option value="other">Другое</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block font-semibold mb-2">
                                    Сообщение
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#12c6dc] resize-none"
                                    placeholder="Опишите вашу задачу или вопрос..."
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                    ✅ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    ❌ Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#12c6dc] hover:bg-[#0da4b1] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                                Нажимая кнопку "Отправить", вы соглашаетесь с обработкой персональных данных
                            </p>
                        </form>
                    </div>
                </section>
            </div>

            {/* Дополнительная информация */}
            <section className="bg-[#0da4b1] text-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div>
                        <h3 className="font-semibold mb-2">📋 Нужна ли предварительная запись?</h3>
                        <p className="text-sm opacity-90">
                            Предварительная запись желательна, но не обязательна. 
                            Вы можете приехать в рабочее время без записи.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">💰 Можно ли оплатить картой?</h3>
                        <p className="text-sm opacity-90">
                            Да, мы принимаем оплату наличными, банковскими картами и переводом.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">🚚 Есть ли выезд мастера на дом?</h3>
                        <p className="text-sm opacity-90">
                            Да, мы предоставляем услугу выезда мастера. 
                            Стоимость выезда зависит от района и составляет от 500 рублей.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">⏱️ Сколько времени занимает ремонт?</h3>
                        <p className="text-sm opacity-90">
                            Время ремонта зависит от сложности. Простые ремонты — 1-3 дня, 
                            сложные — до 2 недель. Срочный ремонт возможен за дополнительную плату.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

