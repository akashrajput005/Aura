import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import NavItems from "./NavItems"
import { Menu } from "lucide-react"


const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle text-white">
                    <Menu className="w-8 h-8" />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-grey-900 md:hidden border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-black text-sm">A</span>
                        </div>
                        <span className="text-xl font-black text-white">Aura</span>
                    </Link>
                    <Separator className="border border-white/5" />
                    <NavItems />
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav
