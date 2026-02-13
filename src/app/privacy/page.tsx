import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1 wrapper py-20 px-6 md:px-12 text-white/90">
                <h1 className="h1-bold mb-8">Privacy Policy</h1>
                <div className="space-y-6 text-lg leading-relaxed max-w-4xl">
                    <p>At Aura, we value your privacy. This policy outlines how we handle your personal data.</p>
                    <h2 className="h3-bold text-primary">1. Data Collection</h2>
                    <p>We collect information you provide directly to us (name, email, profile photo) via Clerk authentication.</p>
                    <h2 className="h3-bold text-primary">2. Use of Data</h2>
                    <p>Your data is used to manage event bookings, personalize your experience, and provide safety features like the Guardian Protocol.</p>
                    <h2 className="h3-bold text-primary">3. Third-Party Services</h2>
                    <p>We use Clerk for auth, MongoDB for storage, and Razorpay for payment processing. Your payment details are never stored on our servers.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
