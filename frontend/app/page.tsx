import Image from 'next/image';
import NewsSection from "./components/NewsSection";
import PopularServicesSection from "./components/PopularServicesSection";
import ProjectsSection from "./components/ProjectsSection";

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
          <PopularServicesSection />

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
          <ProjectsSection />

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
          <NewsSection />

      </main>
  );
}
