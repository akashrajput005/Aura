import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/actions/user.actions'

export const dynamic = "force-dynamic";
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import AuraVault from '@/components/shared/AuraVault';
import AuraNexus from '@/components/shared/AuraNexus';
import Collection from '@/components/shared/Collection';
import CosmicQuests from '@/components/shared/CosmicQuests';
import { Sparkles, Compass, Rocket, Calendar, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

const ProfilePage = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParams = await props.searchParams;
    const { userId: clerkId } = await auth();
    const user = await getUserByClerkId(clerkId!);

    if (!user) {
        return (
            <div className="flex-center min-h-screen gradient-bg flex-col gap-6 text-center px-6">
                <Header />
                <div className="p-8 rounded-3xl glassmorphism border border-white/10 mt-20">
                    <h2 className="text-3xl font-bold text-white mb-2">Aura Sync Pending</h2>
                    <p className="text-white/60 mb-6">We&apos;re finalizing your cosmic profile. Try refreshing in a moment!</p>
                    <Link href="/">
                        <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg">
                            Back to Home
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    // Fetch Paged Data
    const ordersResult = await getOrdersByUser({ userId: user.id, page: ordersPage, limit: 6 }) as {
        data: Array<{
            id: string;
            totalAmount: string;
            createdAt: string | Date;
            event: { title: string }
        }>;
        totalCount: number;
        totalPages: number
    };
    const organizedEventsResult = await getEventsByUser({ userId: user.id, page: eventsPage, limit: 6 }) as { data: unknown[]; totalCount: number; totalPages: number };

    // Handle null events (from deleted events) in orders
    const validOrders = (ordersResult?.data || []).filter(order => order.event);
    const orderedEvents = validOrders.map(order => order.event);

    return (
        <div className="flex flex-col min-h-screen bg-[#030712] relative overflow-hidden">
            {/* Final Cosmic Background Polish */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[60%] h-[40%] bg-primary/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px] animate-pulse-slow" />
            </div>

            <Header />

            <main className="flex-1 space-y-32 pb-40 relative z-10">
                {/* 1. Aura Galaxy Hero / Profile Section */}
                <AnimatedSection delay={0.1}>
                    <section className="relative pt-12">
                        <div className="wrapper px-6 md:px-12">
                            <div className="relative overflow-hidden group p-12 rounded-[48px] bg-gradient-to-br from-primary/10 via-background to-background border border-white/10 glassmorphism">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[150px] -mr-32 -mt-32" />

                                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                                    <div className="relative">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 overflow-hidden bg-white/5 relative">
                                            {user.photo ? (
                                                <img src={user.photo} alt={user.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-5xl font-black text-white/20">
                                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-primary rounded-full p-3 border-2 border-[#030712] shadow-2xl">
                                            <ShieldCheck className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="text-center md:text-left flex-1">
                                        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                                            {user.firstName} {user.lastName}
                                        </h1>
                                        <p className="text-xl text-primary font-bold mb-6 tracking-wide">@{user.username}</p>

                                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                            <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                                                <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1">Aura Points</p>
                                                <p className="text-2xl font-black text-white">{user.auraPoints || 0}</p>
                                            </div>
                                            <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                                                <p className="text-[10px] text-emerald-400/60 uppercase font-bold tracking-widest mb-1">Eco Credits</p>
                                                <p className="text-2xl font-black text-emerald-400">{user.ecoCredits || 0}</p>
                                            </div>
                                            <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                                                <p className="text-[10px] text-orange-400/60 uppercase font-bold tracking-widest mb-1">Current Streak</p>
                                                <p className="text-2xl font-black text-orange-400">{user.streak || 0} Days</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* 2. Full Width Vault Section */}
                <AnimatedSection delay={0.2}>
                    <section id="vault" className="wrapper px-6 md:px-12 scroll-mt-24">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <Rocket className="w-10 h-10 text-primary" />
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Cosmic Vault</h2>
                            </div>
                            <Link href="/orders">
                                <Button variant="outline" className="rounded-full border-white/10 text-white hover:bg-white/5 px-8">Full Ledger</Button>
                            </Link>
                        </div>
                        <AuraVault user={user} orders={validOrders} />
                    </section>
                </AnimatedSection>

                {/* 3. Cosmic Quests - New Earning Guide */}
                <AnimatedSection delay={0.25}>
                    <section id="quests" className="wrapper px-6 md:px-12 scroll-mt-24">
                        <CosmicQuests />
                    </section>
                </AnimatedSection>

                {/* 4. Aura Nexus Hub */}
                <AnimatedSection delay={0.3}>
                    <section id="nexus" className="wrapper px-6 md:px-12 scroll-mt-24">
                        <div className="flex items-center gap-4 mb-12">
                            <Sparkles className="w-10 h-10 text-primary" />
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Aura Nexus</h2>
                        </div>
                        <AuraNexus user={user} />
                    </section>
                </AnimatedSection>

                {/* 4. My Vibes & Creations */}
                <AnimatedSection delay={0.4}>
                    <div className="wrapper px-6 md:px-12 grid grid-cols-1 xl:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div className="flex items-center gap-4">
                                <Compass className="w-10 h-10 text-emerald-400" />
                                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">My Vibes</h2>
                            </div>
                            <Collection
                                data={orderedEvents}
                                emptyTitle="No cosmic tickets yet"
                                emptyStateSubtext="Go explore some events!"
                                collectionType="My_Tickets"
                                limit={3}
                                page={ordersPage}
                                urlParamName="ordersPage"
                                totalPages={ordersResult?.totalPages}
                            />
                        </div>

                        <div className="space-y-12">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-10 h-10 text-primary" />
                                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Creations</h2>
                            </div>
                            <Collection
                                data={organizedEventsResult?.data || []}
                                emptyTitle="No events created yet"
                                emptyStateSubtext="Host your first vibe!"
                                collectionType="Events_Organized"
                                limit={3}
                                page={eventsPage}
                                urlParamName="eventsPage"
                                totalPages={organizedEventsResult?.totalPages}
                            />
                        </div>
                    </div>
                </AnimatedSection>
            </main>

            <Footer />
        </div>
    )
}

export default ProfilePage
