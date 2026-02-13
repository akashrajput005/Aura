import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <div className="wrapper flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white tracking-tight">
                        Aura
                    </span>
                </Link>

                <p className="text-muted-foreground text-sm">
                    &copy; 2026 Aura. Built for the next generation of experiences.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                    <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors text-sm">Privacy</Link>
                    <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors text-sm">Terms</Link>
                    <Link href="/refund" className="text-muted-foreground hover:text-white transition-colors text-sm">Refunds</Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors text-sm">Contact</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Twitter</Link>
                    <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Instagram</Link>
                    <Link href="#" className="text-muted-foreground hover:text-white transition-colors">Discord</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
