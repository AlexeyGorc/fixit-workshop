export default function ProfilePage() {
    return (
        <div className="p-6 space-y-12">
            <h1 className="text-3xl font-bold text-center">Личный кабинет</h1>

            {/* Профиль */}
            <section id="profile" className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Профиль</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 rounded">
                        <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50 w-1/3">ФИО</td>
                            <td className="px-4 py-3 text-gray-800">Иван Иванов</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Email</td>
                            <td className="px-4 py-3 text-gray-800">ivan@example.com</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Телефон</td>
                            <td className="px-4 py-3 text-gray-800">+7 (999) 123-45-67</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Адрес</td>
                            <td className="px-4 py-3 text-gray-800">г. Москва, ул. Примерная, д. 12</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Дата регистрации</td>
                            <td className="px-4 py-3 text-gray-800">15 марта 2024</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <button className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-5 rounded">
                        ✏️ Редактировать профиль
                    </button>
                </div>
            </section>


            {/* История заказов */}
            <section id="orders" className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">История заказов</h2>
                <ul className="space-y-3">
                    <li className="border p-4 rounded bg-white shadow text-gray-900">
                        <span className="font-medium">#1234</span> — Ремонт стиральной машины — 12.05.2024
                        <span className="ml-2 text-sm text-green-600">(завершён)</span>
                    </li>
                    <li className="border p-4 rounded bg-white shadow text-gray-900">
                        <span className="font-medium">#1235</span> — Диагностика ноутбука — 03.06.2024
                        <span className="ml-2 text-sm text-yellow-600">(в процессе)</span>
                    </li>
                    <li className="border p-4 rounded bg-white shadow text-gray-900">
                        <span className="font-medium">#1236</span> — Замена экрана смартфона — 14.06.2024
                        <span className="ml-2 text-sm text-green-600">(завершён)</span>
                    </li>
                    <li className="border p-4 rounded bg-white shadow text-gray-900">
                        <span className="font-medium">#1237</span> — Стул на заказ &#34;Докопай&#34; — 21.06.2024
                        <span className="ml-2 text-sm text-gray-500">(ожидается)</span>
                    </li>
                    <li className="border p-4 rounded bg-white shadow text-gray-900">
                        <span className="font-medium">#1238</span> — Полировка мебели — 04.07.2024
                        <span className="ml-2 text-sm text-green-600">(завершён)</span>
                    </li>
                </ul>
            </section>


            {/* Избранное */}
            <section id="favorites">
                <h2 className="text-xl font-semibold mb-2">Избранное</h2>
                <p className="text-gray-700">Вы ещё ничего не добавили в избранное.</p>
            </section>

            {/* Уведомления */}
            <section id="notifications">
                <h2 className="text-xl font-semibold mb-2">Уведомления</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                    <li>📣 Новая акция: скидка 10% на ремонт ноутбуков</li>
                    <li>🔔 Ваш заказ #512 в статусе &#34;Ожидает подтверждения&#34;</li>
                </ul>
            </section>

            {/* Персональные рекомендации */}
            <section id="recommendations">
                <h2 className="text-xl font-semibold mb-2">Рекомендации</h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                    <li className="border p-4 rounded bg-white shadow">
                        <h3 className="font-semibold mb-1">Чистка кондиционеров</h3>
                        <p className="text-sm text-gray-600">Рекомендуется для регулярного обслуживания</p>
                    </li>
                    <li className="border p-4 rounded bg-white shadow">
                        <h3 className="font-semibold mb-1">Профилактика ноутбука</h3>
                        <p className="text-sm text-gray-600">На основе недавнего обращения</p>
                    </li>
                </ul>
            </section>
        </div>
    );
}
