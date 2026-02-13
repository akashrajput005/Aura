import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-background py-12">
            <div className="wrapper flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-sm">
                        © 2026 Aura Galaxy. All orbits reserved. <span className="text-[10px] opacity-20 ml-2">v2.0-DIAGNOSTIC-ALPHA</span>
                    </p>
                </div>

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
