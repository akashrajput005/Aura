"use server";

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutOrder = async (order: any) => {
    const price = order.isFree ? 0 : Number(order.price) * 100;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: price,
                        product_data: {
                            name: order.eventTitle,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!);
    } catch (error) {
        throw error;
    }
}

export async function createOrder(order: { stripeId: string, eventId: string, buyerId: string, totalAmount: string, createdAt: Date }) {
    try {
        const newOrder = await db.order.create({
            data: {
                stripeId: order.stripeId,
                eventId: order.eventId,
                buyerId: order.buyerId,
                totalAmount: order.totalAmount,
            },
        });

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        console.log(error);
    }
}

export async function getOrdersByEvent({ eventId, searchString }: { eventId: string, searchString: string }) {
    try {
        const orders = await db.order.findMany({
            where: {
                eventId,
                buyer: {
                    OR: [
                        { firstName: { contains: searchString, mode: 'insensitive' } },
                        { lastName: { contains: searchString, mode: 'insensitive' } },
                    ]
                }
            },
            include: {
                buyer: true,
                event: true,
            },
        });

        return JSON.parse(JSON.stringify(orders));
    } catch (error) {
        console.log(error);
    }
}

export async function getOrdersByUser({ userId, limit = 3, page }: { userId: string, limit?: number, page: string | number }) {
    try {
        const skipAmount = (Number(page) - 1) * limit;

        const orders = await db.order.findMany({
            where: { buyerId: userId },
            skip: skipAmount,
            take: limit,
            include: {
                event: {
                    include: {
                        organizer: true,
                        category: true,
                    }
                }
            },
        });

        const ordersCount = await db.order.count({
            where: { buyerId: userId },
        });

        return {
            data: JSON.parse(JSON.stringify(orders)),
            totalPages: Math.ceil(ordersCount / limit),
        };
    } catch (error) {
        console.log(error);
    }
}
