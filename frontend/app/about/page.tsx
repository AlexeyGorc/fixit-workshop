import Image from 'next/image';

export default function AboutPage() {
    return (
        <section id="about" className="px-4 py-8 space-y-8">
            <h1 className="text-3xl font-bold text-center">О нас</h1>
            {/* История компании */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">История компании</h2>
                <p className="text-gray-800 leading-relaxed">
                    FixIt Workshop была основана в 2015 году с целью предоставить качественные и доступные услуги по ремонту бытовой техники.
                    С тех пор компания расширила спектр услуг и открыла несколько филиалов, заслужив доверие тысяч клиентов.
                </p>
            </div>

            {/* Команда */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Наша команда</h2>
                <ul className="grid sm:grid-cols-2 gap-4 text-gray-800">
                    {[
                        {
                            name: 'Алексей Смирнов',
                            role: 'Генеральный директор. Более 15 лет в сфере ремонта электроники.',
                            img: '/images/team/alexey.avif',
                        },
                        {
                            name: 'Мария Иванова',
                            role: 'Главный инженер. Специализация — сложная диагностика и пайка компонентов.',
                            img: '/images/team/maria.avif',
                        },
                        {
                            name: 'Дмитрий Козлов',
                            role: 'Менеджер по работе с клиентами. Обеспечивает высокий уровень сервиса.',
                            img: '/images/team/dmirty.avif',
                        },
                        {
                            name: 'Елена Григорьева',
                            role: 'Мастер по бытовой технике. Более 3000 успешно выполненных заказов.',
                            img: '/images/team/elena.avif',
                        },
                    ].map((member) => (
                        <li
                            key={member.name}
                            className="bg-white p-4 rounded shadow flex flex-col items-center text-center"
                        >
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <div className="relative w-32 h-32 my-2">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover rounded-full"
                                    sizes="128px"
                                />
                            </div>
                            <p>{member.role}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Партнёры */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Наши партнёры</h2>
                <p className="text-gray-800 leading-relaxed">
                    Мы сотрудничаем с ведущими поставщиками комплектующих: Samsung, LG, Bosch, Miele и другими. Наши партнёры — залог качества и надёжности.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 items-center max-w-4xl mx-auto">
                    {[
                        { src: "/images/partners/samsung.png", alt: "Samsung" },
                        { src: "/images/partners/lg.png", alt: "LG" },
                        { src: "/images/partners/bosch.png", alt: "Bosch" },
                        { src: "/images/partners/miele.png", alt: "Miele" },
                    ].map((partner) => (
                        <div key={partner.alt} className="relative h-20 w-full mx-auto">
                            <Image
                                src={partner.src}
                                alt={partner.alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Пресса о нас */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Пресса о нас</h2>
                <ul className="list-disc list-inside text-gray-800 space-y-1">
                    <li>🏆 Лауреаты премии &#34;Лучший сервис 2023&#34; от TechLife</li>
                    <li>📰 Упоминание в журнале &#34;Бытовая техника сегодня&#34;, выпуск №45</li>
                    <li>📺 Интервью с основателем на канале &#34;Ремонт PRO&#34;</li>
                </ul>
            </div>
        </section>

    )
}