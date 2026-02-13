import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex');

    if (expectedSignature === signature) {
        const event = JSON.parse(body);

        console.log('Razorpay Webhook Event:', event.event);

        if (event.event === 'order.paid') {
            const order = event.payload.order.entity;
            const eventId = order.notes?.eventId;
            const buyerId = order.notes?.buyerId;
            const totalAmount = (order.amount / 100).toString();

            if (eventId && buyerId) {
                try {
                    // This is a backup fulfillment in case client-side verification fails
                    await db.order.upsert({
                        where: { stripeId: order.id },
                        update: {},
                        create: {
                            stripeId: order.id,
                            eventId: eventId,
                            buyerId: buyerId,
                            totalAmount: totalAmount,
                        },
                    });
                    console.log('Webhook Fulfillment Success for Order:', order.id);
                } catch (err) {
                    console.error('Webhook DB Error:', err);
                }
            }
        }

        if (event.event === 'payment.captured') {
            console.log('Payment Captured Event processed:', event.payload.payment.entity.id);
        }

        return NextResponse.json({ status: 'ok' });
    } else {
        console.error('Webhook Signature Mismatch. Check RAZORPAY_WEBHOOK_SECRET.');
        return NextResponse.json({ status: 'verification_failed' }, { status: 400 });
    }
}
