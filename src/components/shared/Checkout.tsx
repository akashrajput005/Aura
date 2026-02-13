"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '../ui/button';
import { createRazorpayOrder, verifyRazorpayPayment } from '@/lib/actions/order.actions';

const Checkout = ({ event, userId }: { event: any, userId: string }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            const scriptTag = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (scriptTag) document.body.removeChild(scriptTag);
        }
    }, []);

    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = {
            eventTitle: event.title,
            eventId: event.id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId
        }

        try {
            const razorpayOrder = await createRazorpayOrder(orderData);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SFelKm9QhHUCXh",
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Aura Events",
                description: `Ticket for ${event.title}`,
                order_id: razorpayOrder.id,
                handler: async function (response: any) {
                    try {
                        await verifyRazorpayPayment({
                            ...response,
                            eventId: event.id,
                            buyerId: userId,
                            totalAmount: event.price
                        });
                        window.location.href = `${window.location.origin}/profile?success=true`;
                    } catch (error) {
                        console.error("Verification failed", error);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#624CF5"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Checkout failed", error);
        }
    }

    return (
        <form onSubmit={onCheckout}>
            <Button type="submit" size="lg" className="button sm:w-fit bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-primary/30 group">
                {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
            </Button>
        </form>
    )
}

export default Checkout
