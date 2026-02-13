import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { getAllEvents } from "@/lib/actions/event.actions";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, TreePine } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export default async function Home(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <div className="flex flex-col min-h-screen gradient-bg">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container px-6 mx-auto text-center">
            <AnimatedSection>
              <Badge className="mb-6 px-4 py-1 text-sm bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-all">
                The Evolution of Social Events
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Don't Just Attend. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 font-black">Belong.</span>
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Aura is the first social discovery platform building a better world.
                Match your aura, stay safe with real-time tracking, and earn impact points for your vibe.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#events">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-primary/30 group">
                    Explore Events
                  </Button>
                </Link>
                <Link href="/events/create">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm">
                    Host a Vibe
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/20 blur-[120px] rounded-full -z-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full -z-10" />
        </section>

        {/* Explore Events Section */}
        <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 px-6 md:px-12 py-20">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-8">Trust by <br /> Thousands of Events</h2>

            <div className="flex w-full flex-col gap-5 md:flex-row mb-12">
              <Search />
              <CategoryFilter />
            </div>

            <Collection
              data={events?.data || []}
              emptyTitle="No Events Found"
              emptyStateSubtext="Check back later for more exciting experiences"
              collectionType="All_Events"
              limit={6}
              page={page}
              totalPages={events?.totalPages || 0}
            />
          </AnimatedSection>
        </section>

        {/* Features Preview Section */}
        <section className="py-24 bg-background/50 backdrop-blur-md">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              {/* Features will be mapped with delay */}
              <AnimatedSection delay={0.1}>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform mx-auto md:mx-0">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Vibe-Match</h3>
                  <p className="text-muted-foreground">Never go to an event alone. Our AI matches you with a Micro-Crew based on your interests and vibe.</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform mx-auto md:mx-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Guardian Protocol</h3>
                  <p className="text-muted-foreground">Safety first. Real-time buddy tracking and a one-tap SOS button connected to event security.</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform mx-auto md:mx-0">
                    <TreePine className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Eco-Credits</h3>
                  <p className="text-muted-foreground">Earn rewards for carpooling, using public transit, or attending sustainable workshops.</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

