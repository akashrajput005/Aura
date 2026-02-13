import Razorpay from 'razorpay';
import { db } from "@/lib/db";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (order: any) => {
    const amount = order.isFree ? 0 : Number(order.price) * 100;

    try {
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            metadata: {
                eventId: order.eventId,
                buyerId: order.buyerId,
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);
        return JSON.parse(JSON.stringify(razorpayOrder));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createOrder(order: { razorpayOrderId: string, eventId: string, buyerId: string, totalAmount: string }) {
    try {
        const newOrder = await db.order.create({
            data: {
                stripeId: order.razorpayOrderId, // We'll use stripeId field for razorpay id for now to avoid schema changes
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

export async function verifyRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    eventId,
    buyerId,
    totalAmount
}: any) {
    const crypto = await import('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
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
        throw new Error("Payment verification failed");
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
