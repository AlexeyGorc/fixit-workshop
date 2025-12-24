export default async function NewsSection() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const res = await fetch(`${baseUrl}/news?limit=6`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch news");
    }

    const news: Array<{
        id: number;
        title: string;
        body: string;
        published_at: string;
    }> = await res.json();

    return (
        <section id="news" className="px-4">
            <h2 className="text-2xl font-semibold mb-6">Новости</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white text-black rounded shadow p-5 flex flex-col gap-2"
                    >
                        <h3 className="text-xl font-semibold">{item.title}</h3>

                        <p>{item.body}</p>

                        <span className="text-sm text-gray-500 mt-auto">
              {new Date(item.published_at).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })}
            </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
