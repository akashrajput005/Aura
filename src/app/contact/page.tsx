import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function ContactUs() {
    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1 wrapper py-20 px-6 md:px-12 text-white/90">
                <h1 className="h1-bold mb-8">Contact Us</h1>
                <div className="space-y-6 text-lg leading-relaxed max-w-4xl">
                    <p>We're here to help. Reach out to the Aura team.</p>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <p className="text-xl mb-4"><span className="text-primary font-bold">Email:</span> support@aura-events.com</p>
                        <p className="text-xl"><span className="text-primary font-bold">Inquiry:</span> For business partnerships, please contact hello@aura-events.com</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
