import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
    return (
        <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
            <div className="wrapper flex items-center justify-between px-6 md:px-12 h-20">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                        <span className="text-white font-black text-xl">A</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">Aura</span>
                </Link>

                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems />
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" appearance={{
                            elements: {
                                userButtonAvatarBox: "w-10 h-10 rounded-xl border-2 border-primary/50"
                            }
                        }} />
                        <MobileNav />
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6 h-11" size="lg">
                            <Link href="/sign-in">
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header
