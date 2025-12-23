'use client';

import { useState } from 'react';

interface Service {
    id: string;
    title: string;
    description: string;
    category: string;
    features: string[];
    duration?: string;
    warranty?: string;
}

const services: Service[] = [
    {
        id: '1',
        title: 'Ремонт бытовой техники',
        description: 'Профессиональный ремонт стиральных машин, холодильников, посудомоечных машин, микроволновых печей и другой бытовой техники.',
        category: 'Техника',
        features: [
            'Диагностика неисправностей',
            'Замена деталей',
            'Профилактическое обслуживание',
            'Гарантия на работы'
        ],
        duration: '1-3 дня',
        warranty: '6 месяцев'
    },
    {
        id: '2',
        title: 'Ремонт электроники',
        description: 'Восстановление работоспособности ноутбуков, компьютеров, планшетов, смартфонов и другой электронной техники.',
        category: 'Техника',
        features: [
            'Замена экранов',
            'Ремонт материнских плат',
            'Восстановление данных',
            'Чистка и профилактика'
        ],
        duration: '1-5 дней',
        warranty: '3-12 месяцев'
    },
    {
        id: '3',
        title: 'Ремонт мебели',
        description: 'Реставрация и ремонт корпусной и мягкой мебели, восстановление внешнего вида и функциональности.',
        category: 'Мебель',
        features: [
            'Реставрация деревянной мебели',
            'Замена обивки',
            'Ремонт механизмов',
            'Полировка и лакировка'
        ],
        duration: '3-7 дней',
        warranty: '12 месяцев'
    },
    {
        id: '4',
        title: 'Изготовление на заказ',
        description: 'Индивидуальное изготовление мебели, декоративных элементов и других изделий по вашим эскизам и требованиям.',
        category: 'Изготовление',
        features: [
            'Индивидуальный дизайн',
            'Выбор материалов',
            '3D-визуализация',
            'Полный цикл производства'
        ],
        duration: '7-30 дней',
        warranty: '24 месяца'
    },
    {
        id: '5',
        title: 'Реставрация антиквариата',
        description: 'Профессиональная реставрация старинных предметов мебели, часов и других антикварных изделий.',
        category: 'Реставрация',
        features: [
            'Восстановление исторического вида',
            'Консервация материалов',
            'Реставрация механизмов',
            'Экспертная оценка'
        ],
        duration: '14-60 дней',
        warranty: '12 месяцев'
    },
    {
        id: '6',
        title: 'Ремонт промышленного оборудования',
        description: 'Сервисное обслуживание и ремонт станков, производственного оборудования и промышленной техники.',
        category: 'Промышленность',
        features: [
            'Диагностика оборудования',
            'Замена комплектующих',
            'Калибровка и настройка',
            'Техническое обслуживание'
        ],
        duration: '5-14 дней',
        warranty: '6-12 месяцев'
    },
];

const categories = ['Все', 'Техника', 'Мебель', 'Изготовление', 'Реставрация', 'Промышленность'];

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [expandedService, setExpandedService] = useState<string | null>(null);

    const filteredServices = selectedCategory === 'Все'
        ? services
        : services.filter(service => service.category === selectedCategory);

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Мы предлагаем широкий спектр услуг по ремонту, реставрации и изготовлению изделий на заказ.
                    Каждая услуга выполняется профессионалами с многолетним опытом работы.
                </p>
            </section>

            {/* Фильтр по категориям */}
            <section>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                selectedCategory === category
                                    ? 'bg-[#00d6ef] text-white'
                                    : 'bg-white text-black hover:bg-gray-100'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Список услуг */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-lg shadow-md p-6 text-black flex flex-col"
                    >
                        <div className="mb-4">
                            <span className="inline-block bg-[#0da4b1] text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                {service.category}
                            </span>
                            <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                            <p className="text-gray-700 text-sm mb-4">{service.description}</p>
                        </div>

                        <div className="mt-auto space-y-3">
                            {service.duration && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>⏱️</span>
                                    <span>Срок выполнения: {service.duration}</span>
                                </div>
                            )}
                            {service.warranty && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>🛡️</span>
                                    <span>Гарантия: {service.warranty}</span>
                                </div>
                            )}

                            <button
                                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                                className="w-full bg-[#12c6dc] hover:bg-[#0da4b1] text-white font-semibold py-2 px-4 rounded transition-colors"
                            >
                                {expandedService === service.id ? 'Скрыть детали' : 'Подробнее'}
                            </button>

                            {expandedService === service.id && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="font-semibold mb-2">Что входит в услугу:</h3>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                        {service.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            {/* Дополнительная информация */}
            <section className="bg-[#00d6ef] px-6 py-8 rounded-lg text-black">
                <h2 className="text-2xl font-semibold mb-4 text-center">Почему выбирают нас?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-4xl mb-2">✅</div>
                        <h3 className="font-semibold mb-2">Гарантия качества</h3>
                        <p className="text-sm">На все виды работ предоставляется гарантия от 3 до 24 месяцев</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <h3 className="font-semibold mb-2">Быстрое выполнение</h3>
                        <p className="text-sm">Большинство ремонтов выполняются в течение 1-3 дней</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-2">👨‍🔧</div>
                        <h3 className="font-semibold mb-2">Опытные мастера</h3>
                        <p className="text-sm">Работают только квалифицированные специалисты с опытом от 5 лет</p>
                    </div>
                </div>
            </section>

            {/* Призыв к действию */}
            <section className="text-center">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-black">
                    <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
                    <p className="mb-6 text-gray-700">
                        Свяжитесь с нами, и мы поможем определить необходимый объем работ и рассчитаем стоимость
                    </p>
                    <a
                        href="/contacts"
                        className="inline-block bg-[#12c6dc] hover:bg-[#0da4b1] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                    >
                        Связаться с нами
                    </a>
                </div>
            </section>
        </main>
    );
}

