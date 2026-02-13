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

        if (event.event === 'payment.captured') {
            const payment = event.payload.payment.entity;
            const order_id = payment.order_id;
            const notes = payment.notes; // Razorpay metadata is usually in notes

            // We can also use the orders entity to get metadata if notes are empty
            // For now, we'll rely on the verification action during checkout,
            // but the webhook is a good fallback for reliable fulfillment.

            console.log('Payment Captured:', payment.id);
        }

        return NextResponse.json({ status: 'ok' });
    } else {
        return NextResponse.json({ status: 'verification_failed' }, { status: 400 });
    }
}
