import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function RefundPolicy() {
    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1 wrapper py-20 px-6 md:px-12 text-white/90">
                <h1 className="h1-bold mb-8">Refund & Cancellation Policy</h1>
                <div className="space-y-6 text-lg leading-relaxed max-w-4xl">
                    <p>Our goal is a fair experience for everyone.</p>
                    <h2 className="h3-bold text-primary">1. Cancellations</h2>
                    <p>Tickets can be cancelled up to 24 hours before the event start time for a partial refund (processing fees apply).</p>
                    <h2 className="h3-bold text-primary">2. Refunds</h2>
                    <p>Refunds are processed within 5-7 business days via the original payment method (Razorpay).</p>
                    <h2 className="h3-bold text-primary">3. Rescheduled Events</h2>
                    <p>If an event is rescheduled, your ticket remains valid. If cancelled entirely, a full refund will be issued.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
