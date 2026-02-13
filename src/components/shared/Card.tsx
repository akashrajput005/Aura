import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Edit } from "lucide-react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { motion } from "framer-motion";

type CardProps = {
    event: any;
    hasOrderLink?: boolean;
    hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const { userId } = await auth();
    const isEventCreator = userId === event.organizer.clerkId;

    return (
        <div className="group relative flex min-h-[420px] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition-all hover:bg-white/10 glassmorphism">
            <Link
                href={`/events/${event.id}`}
                className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500 overflow-hidden"
            >
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </Link>

            {/* IS EVENT CREATOR ... */}
            {isEventCreator && !hidePrice && (
                <div className="absolute right-4 top-4 flex flex-col gap-4 rounded-2xl bg-black/40 p-3 shadow-sm backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/events/${event.id}/update`}>
                        <div className="p-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all">
                            <Edit className="w-5 h-5" />
                        </div>
                    </Link>

                    <DeleteConfirmation eventId={event.id} />
                </div>
            )}

            <div className="flex flex-col gap-3 p-6 md:gap-4">
                {!hidePrice && (
                    <div className="flex gap-2">
                        <Badge className="rounded-full bg-primary/20 text-primary border-primary/30">
                            {event.isFree ? "FREE" : `$${event.price}`}
                        </Badge>
                        <Badge className="rounded-full bg-white/10 text-white/80 border-white/20">
                            {event.category.name}
                        </Badge>
                    </div>
                )}

                <p className="p-medium-16 p-medium-18 text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDateTime(event.startDateTime).dateTime}
                </p>

                <Link href={`/events/${event.id}`}>
                    <p className="p-semibold-20 md:p-semibold-24 line-clamp-2 flex-1 text-white group-hover:text-primary transition-colors">
                        {event.title}
                    </p>
                </Link>

                <div className="flex-between w-full mt-2">
                    <p className="p-medium-14 md:p-medium-16 text-muted-foreground flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {event.organizer.firstName} {event.organizer.lastName}
                    </p>

                    {hasOrderLink && (
                        <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
                            <p className="text-primary hover:underline">Order Details</p>
                        </Link>
                    )}
                </div>

                <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                </p>
            </div>
        </div>
    );
};

export default Card;
