import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import { bootstrapAura } from "@/lib/actions/bootstrap.actions";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, TreePine, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Suspense } from "react";
import TrendingEvents from "@/components/shared/TrendingEvents";
import CommunityEvents from "@/components/shared/CommunityEvents";
import { CollectionSkeleton } from "@/components/shared/EventSkeleton";
import VibeMatch from "@/components/shared/VibeMatch";
import GuardianSOS from "@/components/shared/GuardianSOS";
import EcoCredits from "@/components/shared/EcoCredits";

export const dynamic = "force-dynamic";

export default async function Home(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const city = (searchParams?.city as string) || "Mumbai";

  // Bootstrap initial data if needed (runs in background)
  bootstrapAura();

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

        {/* Aura Discovery Section (Suspended) */}
        <section id="discovery" className="wrapper py-10 px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <MapPin className="text-primary w-8 h-8" />
              Trending Near {city}
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'].map((cityName) => (
                <Link key={cityName} href={`/?city=${cityName}#discovery`} scroll={false}>
                  <Badge variant={city === cityName ? "default" : "outline"} className="cursor-pointer px-4 py-1">
                    {cityName}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Global Discovery: Real-time events from partner platforms in {city}.
          </p>

          <Suspense key={city} fallback={<CollectionSkeleton />}>
            <TrendingEvents city={city} searchText={searchText} />
          </Suspense>
        </section>

        {/* Community Hosted Events Section (Suspended) */}
        <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 px-6 md:px-12 py-20">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-2">Community Aura</h2>
            <p className="text-primary text-lg mb-8 font-medium">
              Internal Marketplace: Host, join, and pay securely via Aura Secure Payments.
            </p>

            <div className="flex w-full flex-col gap-5 md:flex-row mb-12">
              <Search />
              <CategoryFilter />
            </div>

            <Suspense fallback={<CollectionSkeleton />}>
              <CommunityEvents searchText={searchText} category={category} page={page} />
            </Suspense>
          </AnimatedSection>
        </section>

        {/* Features Preview Section */}
        <section className="py-24 bg-background/50 backdrop-blur-md px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={0.1}>
                <VibeMatch />
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <GuardianSOS eventTitle="Aura Community" />
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <EcoCredits />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
