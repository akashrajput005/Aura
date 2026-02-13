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
import EventMapWrapper from "@/components/shared/EventMapWrapper";
import VibeMatch from "@/components/shared/VibeMatch";
import GuardianSOS from "@/components/shared/GuardianSOS";
import SafeImage from "@/components/shared/SafeImage";
import EcoCredits from "@/components/shared/EcoCredits";
import Link from "next/link";

const EventDetails = async (props: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const id = params.id;

    let event;
    let relatedEvents;

    try {
        event = await getEventById(id);

        if (event) {
            relatedEvents = await getRelatedEventsByCategory({
                categoryId: event.category?.id || '',
                eventId: event.id,
                page: (searchParams.page as string) || '1',
            });
        }
    } catch (error) {
        console.error("Critical EventDetails Error:", error);
    }

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1">
                {!event ? (
                    <div className="flex-center min-h-[60vh] flex-col gap-6 text-center px-6">
                        <div className="p-8 rounded-3xl glassmorphism border border-white/10">
                            <h2 className="text-3xl font-bold text-white mb-2">Event Missing In Aura</h2>
                            <p className="text-white/60 mb-6">This event might have been archived or the ID is incorrect. Check Trending Discovery for more!</p>
                            <Link href="/">
                                <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg">
                                    Return to Discovery
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain py-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl px-6 md:px-12 gap-10">
                            <div className="h-full min-h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl">
                                <SafeImage
                                    src={event.imageUrl}
                                    alt="hero image"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="flex w-full flex-col gap-8 p-5 md:p-10 glassmorphism rounded-3xl border border-white/10">
                                <div className="flex flex-col gap-6">
                                    <h2 className='h2-bold text-white'>{event.title}</h2>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="flex gap-3">
                                            <Badge className="p-bold-20 rounded-full bg-green-500/10 text-green-400 border-green-500/20 px-5 py-2">
                                                {event.isFree ? 'FREE' : `${event.currency === 'USD' ? '$' : '₹'}${event.price}`}
                                            </Badge>
                                            <p className="p-medium-16 rounded-full bg-white/5 px-4 py-2.5 text-muted-foreground italic border border-white/10">
                                                {event.category?.name || "General"}
                                            </p>
                                        </div>

                                        <p className="p-medium-18 ml-2 mt-2 sm:mt-0 text-white/70">
                                            by{' '}
                                            <span className="text-primary">
                                                {event.organizer?.firstName || "Aura"} {event.organizer?.lastName || "Official"}
                                            </span>
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
                                    {event.url && (
                                        <p className="p-medium-16 lg:p-regular-18 truncate text-primary underline mt-2">
                                            <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a>
                                        </p>
                                    )}
                                </div>

                                <EventMapWrapper location={event.location} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <VibeMatch />
                                    <GuardianSOS eventTitle={event.title} />
                                    <div className="md:col-span-2">
                                        <EcoCredits />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* EVENTS with the same category */}
                {event && (
                    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12 px-6 md:px-12">
                        <h2 className="h2-bold text-white">Related Events</h2>

                        <Collection
                            data={relatedEvents?.data || []}
                            emptyTitle="No Events Found"
                            emptyStateSubtext="Check back later for more excitement in this category"
                            collectionType="All_Events"
                            limit={3}
                            page={(searchParams.page as string) || '1'}
                            totalPages={relatedEvents?.totalPages || 0}
                        />
                    </section>
                )}
            </main>
            <Footer />
        </div>
    )
}

export default EventDetails
