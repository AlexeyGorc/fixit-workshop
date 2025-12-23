import Image from 'next/image';

export default function Home() {
  return (
      <main className="flex flex-col gap-16 py-12">
          {/* Приветствие */}
          <section id="greeting" className="text-center px-4">
              <h2 className="text-3xl font-bold mb-4">Добро пожаловать в FixIt Workshop</h2>
              <p className="text-lg max-w-2xl mx-auto">
                  Наша миссия — предоставить качественные услуги по ремонту и изготовлению изделий на заказ,
                  объединяя современные технологии и опыт мастеров.
              </p>
          </section>

          {/* Популярные услуги */}
          <section id="popular-services" className="px-4">
              <h2 className="text-2xl font-semibold mb-4">Популярные услуги</h2>
              <p className="mb-6 text-base">
                  Наиболее востребованные направления среди клиентов:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded shadow p-4 text-black">Ремонт мебели</div>
                  <div className="bg-white rounded shadow p-4 text-black">Реставрация техники</div>
                  <div className="bg-white rounded shadow p-4 text-black">Индивидуальные заказы</div>
              </div>
          </section>

          {/* Акции и специальные предложения */}
          <section id="special-offers" className="bg-[#00d6ef] px-4 py-10">
              <h2 className="text-2xl font-semibold mb-4">Акции и специальные предложения</h2>
              <p className="mb-4 text-base text-black">Только в этом месяце:</p>
              <ul className="list-disc list-inside text-base text-black">
                  <li>Скидка 15% на реставрацию мебели</li>
                  <li>Бесплатная диагностика при заказе ремонта техники</li>
                  <li>Подарок при первом заказе</li>
              </ul>
          </section>

          {/* Примеры выполненных работ */}
          <section id="examples" className="px-4">
              <h2 className="text-2xl font-semibold mb-4">Примеры выполненных работ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="relative aspect-video rounded shadow overflow-hidden">
                      <Image
                          src="/images/rep1.jpg"
                          alt="Ремонт 1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority
                      />
                  </div>
                  <div className="relative aspect-video rounded shadow overflow-hidden">
                      <Image
                          src="/images/rep2.webp"
                          alt="Ремонт 2"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                      />
                  </div>
                  <div className="relative aspect-video rounded shadow overflow-hidden">
                      <Image
                          src="/images/rep3.jpg"
                          alt="Ремонт 3"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                      />
                  </div>
              </div>
          </section>

          {/* Контактная информация */}
          <section id="contacts" className="flex justify-center px-4">
              <div className="bg-[#0da4b1] text-white rounded-lg shadow-md px-6 py-8 max-w-xl w-full text-center">
                  <h2 className="text-2xl font-bold mb-4">Контактная информация</h2>
                  <ul className="text-base space-y-3">
                      <li className="flex items-center justify-center gap-2">
                          <span role="img" aria-label="phone">📞</span> +7 (999) 123-45-67
                      </li>
                      <li className="flex items-center justify-center gap-2">
                          <span role="img" aria-label="email">📧</span> info@fixitworkshop.ru
                      </li>
                      <li className="flex items-center justify-center gap-2">
                          <span role="img" aria-label="social">🔗</span> Telegram, Instagram, VK — <span className="underline">@fixitworkshop</span>
                      </li>
                  </ul>
              </div>
          </section>

          {/* Новости */}
          <section id="news" className="px-4">
              <h2 className="text-2xl font-semibold mb-6">Новости</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Карточка 1 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Открытие нового офиса</h3>
                      <p>Мы запустили новый филиал в Москве для ещё большего удобства клиентов.</p>
                      <span className="text-sm text-gray-500 mt-auto">12 июля 2025</span>
                  </div>

                  {/* Карточка 2 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Новая категория услуг</h3>
                      <p>Теперь мы предлагаем ремонт промышленного оборудования и станков.</p>
                      <span className="text-sm text-gray-500 mt-auto">1 июля 2025</span>
                  </div>

                  {/* Карточка 3 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Бонусная программа</h3>
                      <p>Запустили систему бонусов и скидок для постоянных клиентов.</p>
                      <span className="text-sm text-gray-500 mt-auto">20 июня 2025</span>
                  </div>

                  {/* Карточка 4 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Расширение команды мастеров</h3>
                      <p>К нам присоединились новые специалисты по деревообработке и электронике.</p>
                      <span className="text-sm text-gray-500 mt-auto">10 июня 2025</span>
                  </div>

                  {/* Карточка 5 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Обновление интерфейса сайта</h3>
                      <p>Добавлены новые разделы, улучшена навигация и адаптивность на мобильных устройствах.</p>
                      <span className="text-sm text-gray-500 mt-auto">28 мая 2025</span>
                  </div>

                  {/* Карточка 6 */}
                  <div className="bg-white text-black rounded shadow p-5 flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">Новый партнёр по поставке материалов</h3>
                      <p>Мы заключили соглашение с поставщиком премиальных материалов для реставрации мебели.</p>
                      <span className="text-sm text-gray-500 mt-auto">15 мая 2025</span>
                  </div>
              </div>
          </section>
      </main>
  );
}
