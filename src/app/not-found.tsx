import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="glassmorphism p-12 rounded-[2.5rem] border border-white/10 max-w-lg shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />

                    <Search className="w-16 h-16 text-primary mb-6 mx-auto opacity-50" />
                    <h2 className="text-5xl font-black text-white mb-4">404</h2>
                    <h3 className="text-2xl font-bold text-white/90 mb-4">Vibe Not Found</h3>
                    <p className="text-white/60 mb-10 leading-relaxed">
                        The event or page you're searching for is currently outside our frequency. Try exploring something new near you!
                    </p>
                    <Link href="/">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-xl shadow-xl shadow-primary/30">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    )
}
