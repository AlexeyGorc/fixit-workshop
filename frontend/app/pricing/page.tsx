'use client';

import { useState } from 'react';

interface PriceItem {
    id: string;
    service: string;
    category: string;
    price: string;
    unit?: string;
    description?: string;
}

const priceList: PriceItem[] = [
    // Бытовая техника
    { id: '1', service: 'Диагностика стиральной машины', category: 'Бытовая техника', price: '1500', unit: 'руб.' },
    { id: '2', service: 'Ремонт стиральной машины', category: 'Бытовая техника', price: 'от 3000', unit: 'руб.' },
    { id: '3', service: 'Диагностика холодильника', category: 'Бытовая техника', price: '1500', unit: 'руб.' },
    { id: '4', service: 'Заправка холодильника фреоном', category: 'Бытовая техника', price: 'от 2500', unit: 'руб.' },
    { id: '5', service: 'Ремонт посудомоечной машины', category: 'Бытовая техника', price: 'от 2500', unit: 'руб.' },
    { id: '6', service: 'Ремонт микроволновой печи', category: 'Бытовая техника', price: 'от 2000', unit: 'руб.' },
    
    // Электроника
    { id: '7', service: 'Диагностика ноутбука', category: 'Электроника', price: '1000', unit: 'руб.' },
    { id: '8', service: 'Замена экрана ноутбука', category: 'Электроника', price: 'от 5000', unit: 'руб.' },
    { id: '9', service: 'Замена матрицы ноутбука', category: 'Электроника', price: 'от 3000', unit: 'руб.' },
    { id: '10', service: 'Ремонт материнской платы', category: 'Электроника', price: 'от 4000', unit: 'руб.' },
    { id: '11', service: 'Замена экрана смартфона', category: 'Электроника', price: 'от 2500', unit: 'руб.' },
    { id: '12', service: 'Замена батареи смартфона', category: 'Электроника', price: 'от 2000', unit: 'руб.' },
    { id: '13', service: 'Восстановление данных', category: 'Электроника', price: 'от 3000', unit: 'руб.' },
    
    // Мебель
    { id: '14', service: 'Реставрация деревянной мебели', category: 'Мебель', price: 'от 5000', unit: 'руб./м²' },
    { id: '15', service: 'Замена обивки дивана', category: 'Мебель', price: 'от 15000', unit: 'руб.' },
    { id: '16', service: 'Ремонт механизма дивана', category: 'Мебель', price: 'от 3000', unit: 'руб.' },
    { id: '17', service: 'Полировка мебели', category: 'Мебель', price: 'от 2000', unit: 'руб./м²' },
    { id: '18', service: 'Лакировка мебели', category: 'Мебель', price: 'от 3000', unit: 'руб./м²' },
    
    // Изготовление на заказ
    { id: '19', service: 'Изготовление корпусной мебели', category: 'Изготовление', price: 'от 15000', unit: 'руб./м²' },
    { id: '20', service: 'Изготовление стола на заказ', category: 'Изготовление', price: 'от 8000', unit: 'руб.' },
    { id: '21', service: 'Изготовление шкафа на заказ', category: 'Изготовление', price: 'от 20000', unit: 'руб.' },
    { id: '22', service: 'Изготовление кухни на заказ', category: 'Изготовление', price: 'от 50000', unit: 'руб.' },
];

const categories = ['Все', 'Бытовая техника', 'Электроника', 'Мебель', 'Изготовление'];

export default function PricingPage() {
    const [selectedCategory, setSelectedCategory] = useState('Все');
    const [calculatorType, setCalculatorType] = useState<'repair' | 'furniture' | 'custom'>('repair');

    // Калькулятор ремонта техники
    const [repairData, setRepairData] = useState({
        deviceType: 'washing-machine',
        issueType: 'diagnostics',
        urgency: 'standard',
    });

    // Калькулятор реставрации мебели
    const [furnitureData, setFurnitureData] = useState({
        furnitureType: 'table',
        area: 1,
        workType: 'polish',
    });

    // Калькулятор изготовления на заказ
    const [customData, setCustomData] = useState({
        itemType: 'table',
        material: 'wood',
        complexity: 'simple',
        size: 1,
    });

    const filteredPrices = selectedCategory === 'Все'
        ? priceList
        : priceList.filter(item => item.category === selectedCategory);

    const calculateRepairPrice = () => {
        let basePrice = 0;
        
        // Базовая цена по типу устройства
        const devicePrices: Record<string, number> = {
            'washing-machine': 3000,
            'refrigerator': 2500,
            'dishwasher': 2500,
            'microwave': 2000,
            'laptop': 4000,
            'smartphone': 2500,
        };

        basePrice = devicePrices[repairData.deviceType] || 2000;

        // Множитель по типу работы
        const issueMultipliers: Record<string, number> = {
            'diagnostics': 0.5,
            'simple-repair': 1,
            'complex-repair': 1.5,
            'replacement': 1.2,
        };

        basePrice *= issueMultipliers[repairData.issueType] || 1;

        // Множитель срочности
        const urgencyMultipliers: Record<string, number> = {
            'standard': 1,
            'urgent': 1.3,
            'express': 1.5,
        };

        basePrice *= urgencyMultipliers[repairData.urgency] || 1;

        return Math.round(basePrice);
    };

    const calculateFurniturePrice = () => {
        let pricePerSquareMeter = 0;

        const workPrices: Record<string, number> = {
            'polish': 2000,
            'varnish': 3000,
            'restoration': 5000,
            'upholstery': 15000,
        };

        pricePerSquareMeter = workPrices[furnitureData.workType] || 2000;

        const furnitureMultipliers: Record<string, number> = {
            'table': 1,
            'chair': 0.5,
            'cabinet': 1.2,
            'sofa': 1.5,
        };

        pricePerSquareMeter *= furnitureMultipliers[furnitureData.furnitureType] || 1;

        return Math.round(pricePerSquareMeter * furnitureData.area);
    };

    const calculateCustomPrice = () => {
        let basePrice = 0;

        const itemPrices: Record<string, number> = {
            'table': 8000,
            'cabinet': 20000,
            'chair': 5000,
            'shelf': 4000,
        };

        basePrice = itemPrices[customData.itemType] || 8000;

        const materialMultipliers: Record<string, number> = {
            'wood': 1,
            'mdf': 0.7,
            'metal': 1.2,
            'premium': 1.5,
        };

        basePrice *= materialMultipliers[customData.material] || 1;

        const complexityMultipliers: Record<string, number> = {
            'simple': 1,
            'medium': 1.3,
            'complex': 1.6,
        };

        basePrice *= complexityMultipliers[customData.complexity] || 1;
        basePrice *= customData.size;

        return Math.round(basePrice);
    };

    return (
        <main className="flex flex-col gap-12 py-12 px-4">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Цены и калькуляторы</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Прозрачное ценообразование и удобные калькуляторы для предварительного расчета стоимости услуг
                </p>
            </section>

            {/* Калькуляторы */}
            <section className="bg-white rounded-lg shadow-md p-8 text-black">
                <h2 className="text-2xl font-bold mb-6 text-center">Калькулятор стоимости</h2>
                
                {/* Переключатель типов калькуляторов */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    <button
                        onClick={() => setCalculatorType('repair')}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            calculatorType === 'repair'
                                ? 'bg-[#00d6ef] text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                    >
                        Ремонт техники
                    </button>
                    <button
                        onClick={() => setCalculatorType('furniture')}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            calculatorType === 'furniture'
                                ? 'bg-[#00d6ef] text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                    >
                        Реставрация мебели
                    </button>
                    <button
                        onClick={() => setCalculatorType('custom')}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            calculatorType === 'custom'
                                ? 'bg-[#00d6ef] text-white'
                                : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                    >
                        Изготовление на заказ
                    </button>
                </div>

                {/* Калькулятор ремонта техники */}
                {calculatorType === 'repair' && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div>
                            <label className="block font-semibold mb-2">Тип устройства</label>
                            <select
                                value={repairData.deviceType}
                                onChange={(e) => setRepairData({ ...repairData, deviceType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="washing-machine">Стиральная машина</option>
                                <option value="refrigerator">Холодильник</option>
                                <option value="dishwasher">Посудомоечная машина</option>
                                <option value="microwave">Микроволновая печь</option>
                                <option value="laptop">Ноутбук</option>
                                <option value="smartphone">Смартфон</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Тип работ</label>
                            <select
                                value={repairData.issueType}
                                onChange={(e) => setRepairData({ ...repairData, issueType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="diagnostics">Диагностика</option>
                                <option value="simple-repair">Простой ремонт</option>
                                <option value="complex-repair">Сложный ремонт</option>
                                <option value="replacement">Замена деталей</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Срочность</label>
                            <select
                                value={repairData.urgency}
                                onChange={(e) => setRepairData({ ...repairData, urgency: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="standard">Стандартная (1-3 дня)</option>
                                <option value="urgent">Срочная (в течение дня)</option>
                                <option value="express">Экспресс (2-4 часа)</option>
                            </select>
                        </div>

                        <div className="bg-[#0da4b1] text-white p-6 rounded-lg text-center">
                            <p className="text-sm mb-2">Предварительная стоимость</p>
                            <p className="text-3xl font-bold">{calculateRepairPrice().toLocaleString()} ₽</p>
                            <p className="text-xs mt-2 opacity-90">* Точная стоимость определяется после диагностики</p>
                        </div>
                    </div>
                )}

                {/* Калькулятор реставрации мебели */}
                {calculatorType === 'furniture' && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div>
                            <label className="block font-semibold mb-2">Тип мебели</label>
                            <select
                                value={furnitureData.furnitureType}
                                onChange={(e) => setFurnitureData({ ...furnitureData, furnitureType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="table">Стол</option>
                                <option value="chair">Стул</option>
                                <option value="cabinet">Шкаф</option>
                                <option value="sofa">Диван</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Тип работ</label>
                            <select
                                value={furnitureData.workType}
                                onChange={(e) => setFurnitureData({ ...furnitureData, workType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="polish">Полировка</option>
                                <option value="varnish">Лакировка</option>
                                <option value="restoration">Реставрация</option>
                                <option value="upholstery">Замена обивки</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Площадь/Количество (м² или шт.)
                            </label>
                            <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={furnitureData.area}
                                onChange={(e) => setFurnitureData({ ...furnitureData, area: parseFloat(e.target.value) || 1 })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div className="bg-[#0da4b1] text-white p-6 rounded-lg text-center">
                            <p className="text-sm mb-2">Предварительная стоимость</p>
                            <p className="text-3xl font-bold">{calculateFurniturePrice().toLocaleString()} ₽</p>
                            <p className="text-xs mt-2 opacity-90">* Точная стоимость определяется после осмотра</p>
                        </div>
                    </div>
                )}

                {/* Калькулятор изготовления на заказ */}
                {calculatorType === 'custom' && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div>
                            <label className="block font-semibold mb-2">Тип изделия</label>
                            <select
                                value={customData.itemType}
                                onChange={(e) => setCustomData({ ...customData, itemType: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="table">Стол</option>
                                <option value="cabinet">Шкаф</option>
                                <option value="chair">Стул</option>
                                <option value="shelf">Полка</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Материал</label>
                            <select
                                value={customData.material}
                                onChange={(e) => setCustomData({ ...customData, material: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="wood">Дерево</option>
                                <option value="mdf">МДФ</option>
                                <option value="metal">Металл</option>
                                <option value="premium">Премиум материалы</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Сложность</label>
                            <select
                                value={customData.complexity}
                                onChange={(e) => setCustomData({ ...customData, complexity: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="simple">Простая</option>
                                <option value="medium">Средняя</option>
                                <option value="complex">Сложная</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">Размер (коэффициент)</label>
                            <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={customData.size}
                                onChange={(e) => setCustomData({ ...customData, size: parseFloat(e.target.value) || 1 })}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <p className="text-xs text-gray-500 mt-1">1.0 = стандартный размер, 1.5 = увеличенный и т.д.</p>
                        </div>

                        <div className="bg-[#0da4b1] text-white p-6 rounded-lg text-center">
                            <p className="text-sm mb-2">Предварительная стоимость</p>
                            <p className="text-3xl font-bold">{calculateCustomPrice().toLocaleString()} ₽</p>
                            <p className="text-xs mt-2 opacity-90">* Точная стоимость определяется после согласования проекта</p>
                        </div>
                    </div>
                )}
            </section>

            {/* Прайс-лист */}
            <section>
                <h2 className="text-3xl font-bold mb-6 text-center">Прайс-лист</h2>
                
                {/* Фильтр по категориям */}
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

                {/* Таблица цен */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-black">
                            <thead className="bg-[#0da4b1] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">Услуга</th>
                                    <th className="px-6 py-4 text-left font-semibold">Категория</th>
                                    <th className="px-6 py-4 text-right font-semibold">Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPrices.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                    >
                                        <td className="px-6 py-4">{item.service}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.category}</td>
                                        <td className="px-6 py-4 text-right font-semibold">
                                            {item.price} {item.unit || 'руб.'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Примечания */}
            <section className="bg-[#00d6ef] px-6 py-8 rounded-lg text-black">
                <h2 className="text-2xl font-semibold mb-4 text-center">Важная информация</h2>
                <div className="max-w-3xl mx-auto space-y-3 text-sm">
                    <p>
                        <strong>💡 О ценах:</strong> Указанные цены являются ориентировочными. 
                        Точная стоимость определяется после диагностики или осмотра изделия.
                    </p>
                    <p>
                        <strong>🛡️ Гарантия:</strong> На все виды работ предоставляется гарантия от 3 до 24 месяцев 
                        в зависимости от типа услуги.
                    </p>
                    <p>
                        <strong>📞 Консультация:</strong> Бесплатная консультация по телефону или при визите в мастерскую. 
                        Диагностика оплачивается отдельно, но её стоимость засчитывается при заказе ремонта.
                    </p>
                    <p>
                        <strong>⚡ Срочность:</strong> Срочные заказы (в течение дня) и экспресс-ремонт (2-4 часа) 
                        оплачиваются с коэффициентом 1.3-1.5.
                    </p>
                </div>
            </section>
        </main>
    );
}

