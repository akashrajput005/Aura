"use server";

import Razorpay from 'razorpay';
import { db } from "@/lib/db";
import crypto from 'crypto';

const getRazorpayInstance = () => {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
        throw new Error("Razorpay API keys are missing. Please check your .env file.");
    }

    return new Razorpay({
        key_id,
        key_secret,
    });
};

export const createRazorpayOrder = async (order: any) => {
    // Ensure amount is a valid number and at least 0
    const price = parseFloat(order.price) || 0;
    const amount = order.isFree ? 0 : Math.round(price * 100);

    // If it's a free event, we don't need a Razorpay order
    if (amount === 0) {
        return { id: 'free_event', amount: 0, currency: "INR" };
    }

    try {
        const razorpay = getRazorpayInstance();
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`.slice(0, 40), // Receipt limit is 40 chars
            notes: { // Use notes instead of metadata for simpler key-value pairs if needed
                eventId: order.eventId,
                buyerId: order.buyerId,
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);
        return JSON.parse(JSON.stringify(razorpayOrder));
    } catch (error: any) {
        console.error("Razorpay Order Error Details:", {
            message: error.message,
            description: error.description,
            code: error.code,
            metadata: error.metadata
        });
        throw new Error(error.description || error.message || "Failed to create Razorpay order");
    }
}

export async function createOrder(order: { razorpayOrderId: string, eventId: string, buyerId: string, totalAmount: string }) {
    try {
        if (!order.buyerId || !order.eventId || !order.razorpayOrderId) {
            console.error("Missing required fields for order creation:", order);
            throw new Error("Missing required order information (Buyer, Event, or Transaction ID).");
        }

        const newOrder = await db.order.create({
            data: {
                stripeId: order.razorpayOrderId,
                eventId: order.eventId,
                buyerId: order.buyerId,
                totalAmount: order.totalAmount,
            },
        });

        console.log("Order Created Successfully:", newOrder.id);
        return JSON.parse(JSON.stringify(newOrder));
    } catch (error: any) {
        console.error("Database Order Creation Error:", error);
        throw new Error(error.message || "Failed to save order to database.");
    }
}

export async function verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    eventId,
    buyerId,
    totalAmount
}: any) {
    // Handle Free Events (Skip Signature Check)
    if (razorpay_order_id === 'free_event') {
        return await createOrder({
            razorpayOrderId: 'free_event_' + Date.now(),
            eventId,
            buyerId,
            totalAmount: '0'
        });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        return await createOrder({
            razorpayOrderId: razorpay_order_id,
            eventId,
            buyerId,
            totalAmount
        });
    } else {
        throw new Error("Payment verification failed: Signature mismatch");
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
            totalCount: ordersCount,
        };
    } catch (error) {
        console.log(error);
    }
}
