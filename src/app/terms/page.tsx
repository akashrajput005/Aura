import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function TermsAndConditions() {
    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1 wrapper py-20 px-6 md:px-12 text-white/90">
                <h1 className="h1-bold mb-8">Terms & Conditions</h1>
                <div className="space-y-6 text-lg leading-relaxed max-w-4xl">
                    <p>By using Aura, you agree to the following terms.</p>
                    <h2 className="h3-bold text-primary">1. User Conduct</h2>
                    <p>Users must be respectful and prioritize safety. Harassment or misuse of the platform is strictly prohibited.</p>
                    <h2 className="h3-bold text-primary">2. Event Hosting</h2>
                    <p>Organizers are responsible for the accuracy and safety of their events.</p>
                    <h2 className="h3-bold text-primary">3. Payments</h2>
                    <p>All ticket purchases are final, unless specified otherwise by the event organizer.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
