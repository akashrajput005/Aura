import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Edit } from "lucide-react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import SafeImage from "./SafeImage";

type CardProps = {
    event: any;
    hasOrderLink?: boolean;
    hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const { userId } = await auth();
    const isEventCreator = userId === event.organizer?.clerkId;
    const categoryName = event.category?.name || event.category || "General";
    const isInternal = !!event.organizer;

    return (
        <div className="group relative flex min-h-[420px] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-primary/50 hover:shadow-primary/5 glassmorphism">
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden">
                <Link
                    href={`/events/${event.id}`}
                    className="flex-center w-full h-full bg-grey-50 bg-cover bg-center"
                >
                    <SafeImage src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </Link>

                {/* Visual Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                    <Badge className={`${isInternal ? 'bg-primary/90' : 'bg-emerald-500/80'} text-white backdrop-blur-md border-white/10 shadow-lg px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                        {isInternal ? "Verified Host" : "Aura Partner"}
                    </Badge>
                </div>

                {/* Event Creation Overlay */}
                {isEventCreator && !hidePrice && (
                    <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 rounded-2xl bg-black/40 p-2 shadow-sm backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/events/${event.id}/update`}>
                            <div className="p-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/50 transition-all">
                                <Edit className="w-5 h-5" />
                            </div>
                        </Link>
                        <DeleteConfirmation eventId={event.id} />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 p-6 md:gap-4 flex-1">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                        <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 text-[11px] font-medium">
                            {categoryName}
                        </Badge>
                        {!hidePrice && !event.isFree && (
                            <Badge className="rounded-full bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[11px] font-bold">
                                {event.currency === 'USD' ? '$' : '₹'}{event.price}
                            </Badge>
                        )}
                        {!hidePrice && event.isFree && (
                            <Badge className="rounded-full bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[11px] font-bold">
                                FREE
                            </Badge>
                        )}
                    </div>
                    <p className="text-[11px] text-white/30 uppercase tracking-tighter flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.startDateTime instanceof Date ? formatDateTime(event.startDateTime).dateOnly : "Upcoming"}
                    </p>
                </div>

                <Link href={event.url || `/events/${event.id}`} className="group/title">
                    <h3 className="text-xl md:text-2xl font-bold line-clamp-2 text-white group-hover/title:text-primary transition-colors leading-snug">
                        {event.title}
                    </h3>
                </Link>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="text-sm text-white/60 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10">
                                {event.organizer?.photo ? (
                                    <img src={event.organizer.photo} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-3.5 h-3.5 text-white/40" />
                                )}
                            </div>
                            {event.organizer?.firstName || "Aura"} {event.organizer?.lastName || ""}
                        </div>

                        {hasOrderLink && (
                            <Link href={`/orders?eventId=${event.id}`} className="text-primary hover:underline text-xs font-semibold flex items-center gap-1">
                                Order Details
                            </Link>
                        )}
                    </div>

                    <p className="text-white/40 text-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary/60" />
                        <span className="truncate">{event.location}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
