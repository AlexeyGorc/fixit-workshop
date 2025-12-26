import ServiceReviews from "@/app/components/ServiceReviews";

export default function ServiceReviewsPage({ params }: { params: { id: string } }) {
    const serviceId = Number(params.id);

    return (
        <main className="py-12 px-4 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Отзывы по услуге</h1>
            <ServiceReviews serviceId={serviceId} />
        </main>
    );
}
