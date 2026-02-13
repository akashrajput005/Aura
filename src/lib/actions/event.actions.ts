"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createEvent({ event, userId, path }: any) {
    try {
        const newEvent = await db.event.create({
            data: {
                ...event,
                organizerId: userId,
            },
        });

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error);
    }
}

export async function getEventById(eventId: string) {
    try {
        const event = await db.event.findUnique({
            where: { id: eventId },
            include: {
                organizer: true,
                category: true,
            },
        });

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log(error);
    }
}

export async function getAllEvents({ query, limit = 6, page, category }: any) {
    try {
        const skipAmount = (Number(page) - 1) * limit;

        const where: any = {
            title: { contains: query, mode: "insensitive" },
        };

        if (category) {
            where.category = { name: category };
        }

        const events = await db.event.findMany({
            where,
            skip: skipAmount,
            take: limit,
            include: {
                organizer: true,
                category: true,
            },
            orderBy: { createdAt: "desc" },
        });

        const eventsCount = await db.event.count({ where });

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        console.log(error);
    }
}

export async function deleteEvent({ eventId, path }: { eventId: string, path: string }) {
    try {
        await db.event.delete({ where: { id: eventId } });
        revalidatePath(path);
    } catch (error) {
        console.log(error);
    }
}

export async function updateEvent({ userId, event, path }: any) {
    try {
        const updatedEvent = await db.event.update({
            where: { id: event.id },
            data: { ...event },
        });

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedEvent));
    } catch (error) {
        console.log(error);
    }
}

export async function getRelatedEventsByCategory({ categoryId, eventId, limit = 3, page }: any) {
    try {
        const skipAmount = (Number(page) - 1) * limit;

        const where = {
            categoryId,
            NOT: { id: eventId },
        };

        const events = await db.event.findMany({
            where,
            skip: skipAmount,
            take: limit,
            include: {
                organizer: true,
                category: true,
            },
        });

        const eventsCount = await db.event.count({ where });

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        console.log(error);
    }
}

export async function getEventsByUser({ userId, limit = 6, page }: any) {
    try {
        const skipAmount = (Number(page) - 1) * limit;

        const events = await db.event.findMany({
            where: { organizerId: userId },
            skip: skipAmount,
            take: limit,
            include: {
                organizer: true,
                category: true,
            },
        });

        const eventsCount = await db.event.count({
            where: { organizerId: userId },
        });

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        console.log(error);
    }
}
