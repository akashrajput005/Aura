import { getEventById, getRelatedEventsByCategory } from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("../../../components/shared/EventMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-3xl mt-10 border border-white/10" />
});

const EventDetails = async (props: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const id = params.id;

    const event = await getEventById(id);

    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category.id,
        eventId: event.id,
        page: searchParams.page as string,
    });

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl px-6 md:px-12 gap-10">
                    <img
                        src={event.imageUrl}
                        alt="hero image"
                        width={1000}
                        height={1000}
                        className="h-full min-h-[300px] object-cover object-center rounded-3xl shadow-2xl"
                    />

                    <div className="flex w-full flex-col gap-8 p-5 md:p-10 glassmorphism rounded-3xl border border-white/10">
                        <div className="flex flex-col gap-6">
                            <h2 className='h2-bold text-white'>{event.title}</h2>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <Badge className="p-bold-20 rounded-full bg-green-500/10 text-green-400 border-green-500/20 px-5 py-2">
                                        {event.isFree ? 'FREE' : `$${event.price}`}
                                    </Badge>
                                    <p className="p-medium-16 rounded-full bg-white/5 px-4 py-2.5 text-muted-foreground italic border border-white/10">
                                        {event.category.name}
                                    </p>
                                </div>

                                <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-white/70">
                                    by{' '}
                                    <span className="text-primary">{event.organizer.firstName} {event.organizer.lastName}</span>
                                </p>
                            </div>
                        </div>

                        <CheckoutButton event={event} />

                        <div className="flex flex-col gap-5">
                            <div className='flex gap-2 md:gap-3 items-center'>
                                <Calendar className="w-6 h-6 text-primary" />
                                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center text-white/80">
                                    <p>
                                        {formatDateTime(event.startDateTime).dateOnly} - {' '}
                                        {formatDateTime(event.startDateTime).timeOnly}
                                    </p>
                                    <p className="mx-2">to</p>
                                    <p>
                                        {formatDateTime(event.endDateTime).dateOnly} - {' '}
                                        {formatDateTime(event.endDateTime).timeOnly}
                                    </p>
                                </div>
                            </div>

                            <div className="p-regular-20 flex items-center gap-3 text-white/80">
                                <MapPin className="w-6 h-6 text-primary" />
                                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="p-bold-20 text-white/60">What You'll Experience:</p>
                            <p className="p-medium-16 lg:p-regular-18 text-white/90 leading-relaxed">{event.description}</p>
                            <p className="p-medium-16 lg:p-regular-18 truncate text-primary underline mt-2">{event.url}</p>
                        </div>

                        <EventMap location={event.location} />
                    </div>
                </div>
            </section>

            {/* EVENTS with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 px-6 md:px-12">
                <h2 className="h2-bold text-white">Related Events</h2>

                <Collection
                    data={relatedEvents?.data}
                    emptyTitle="No Events Found"
                    emptyStateSubtext="Check back later for more excitement in this category"
                    collectionType="All_Events"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedEvents?.totalPages}
                />
            </section>
            <Footer />
        </div>
    )
}

export default EventDetails
