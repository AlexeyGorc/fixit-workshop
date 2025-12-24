export default async function ProjectsSection() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not set");
    }

    const res = await fetch(`${baseUrl}/projects?limit=6`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

    const projects: Array<{
        id: number;
        name: string;
        description: string | null;
        image_url: string | null;
        created_at: string;
        service: {
            id: number;
            name: string;
            category: string;
            subcategory: string | null;
        } | null;
    }> = await res.json();

    const categoryRu: Record<string, string> = {
        household: "Бытовые изделия",
        industrial: "Промышленные изделия",
        custom_project: "Индивидуальные проекты",
        restoration: "Реставрация",
    };

    return (
        <section id="projects" className="px-4">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">Примеры работ</h2>
                    <p className="text-base opacity-80 mt-1">
                        Несколько свежих проектов из нашего портфолио.
                    </p>
                </div>

                <a
                    href="/projects"
                    className="bg-white text-black rounded px-4 py-2 shadow"
                >
                    Все проекты
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <article
                        key={p.id}
                        className="bg-white text-black rounded shadow overflow-hidden"
                    >
                        {p.image_url ? (
                            <img
                                src={p.image_url}
                                alt={p.name}
                                className="w-full h-44 object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-44 bg-zinc-200" />
                        )}

                        <div className="p-4 flex flex-col gap-2">
                            <div className="text-xs text-gray-500">
                                {p.service ? (categoryRu[p.service.category] ?? p.service.category) : "—"}
                                {p.service?.subcategory ? ` • ${p.service.subcategory}` : ""}
                            </div>

                            <h3 className="text-lg font-semibold">{p.name}</h3>

                            {p.description ? (
                                <p className="text-sm line-clamp-3">{p.description}</p>
                            ) : null}

                            <span className="text-xs text-gray-500 mt-auto">
                {new Date(p.created_at).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
              </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
