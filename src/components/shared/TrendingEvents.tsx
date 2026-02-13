import { fetchExternalEvents } from "@/lib/discovery";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SafeImage from "./SafeImage";

export default async function TrendingEvents({ city, searchText }: { city: string, searchText: string }) {
    const externalEvents = await fetchExternalEvents({
        query: searchText,
        city
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* SERPER DIAGNOSTIC (Only visible to admin) */}
            {!process.env.SERPER_API_KEY && (
                <div className="col-span-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-2 rounded-xl mb-4 font-mono">
                    ⚠️ Aura Discovery Diagnostic: SERPER_API_KEY is missing in environment. Falling back to curated data.
                </div>
            )}

            {externalEvents.length > 0 ? (
                externalEvents.map((event: any) => (
                    <Link key={event.id} href={event.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                        <div className="h-full relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all flex flex-col shadow-xl">
                            <div className="aspect-video relative overflow-hidden">
                                <SafeImage src={event.imageUrl} alt={event.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className={`px-4 py-1 font-bold ${event.category === 'LIVE NOW' ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}>
                                        {event.category}
                                    </Badge>
                                    <Badge variant="outline" className="bg-black/50 text-white/70 border-white/20 backdrop-blur-md">
                                        Partner
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="text-primary font-bold text-lg">
                                        {event.isFree ? 'FREE' : `₹${event.price}`}
                                    </span>
                                    <Button size="sm" variant="ghost" className="text-primary group-hover:bg-primary/10 transition-all rounded-full">
                                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-full py-10 text-center text-muted-foreground bg-white/5 rounded-3xl border border-dashed border-white/10">
                    No trending events discovered in {city} yet. Be the first to host!
                </div>
            )}
        </div>
    );
}
