// This service handles discovery of events from real-time external sources
// Using Serper.dev (Google Events API) for actual India-wide discovery.

export const fetchExternalEvents = async ({ query = '', city = 'Mumbai', category = '' }: { query?: string, city?: string, category?: string }) => {
    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey) {
        console.warn("SERPER_API_KEY is missing. Falling back to curated discovery.");
        return getCuratedEvents(city, query);
    }

    try {
        // Optimized variety by rotating query types
        const queryTypes = [
            `Events happening in ${city} today`,
            `Scheduled concerts in ${city} 2026`,
            `Ongoing festivals in ${city}`,
            `Upcoming tech meetups in ${city} this month`,
            `Live workshops in ${city} right now`
        ];

        const baseQuery = queryTypes[Math.floor(Math.random() * queryTypes.length)];
        const q = `${baseQuery} ${query}`.trim();

        const response = await fetch("https://google.serper.dev/events", {
            method: "POST",
            headers: {
                "X-API-KEY": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q,
                gl: "in",
                hl: "en",
            }),
            next: { revalidate: 3600 }
        });

        const data = await response.json();

        if (!data.events || data.events.length === 0) {
            return getCuratedEvents(city, query);
        }

        return data.events.map((event: any, index: number) => {
            const startStr = event.date?.startDate || "";
            const isLive = startStr.toLowerCase().includes('today') || startStr.toLowerCase().includes('now');

            return {
                id: `ext_${index}_${event.title.replace(/\s+/g, '_')}`,
                title: event.title,
                description: event.snippet || "Join the pulse of the city with Aura Discovery.",
                location: event.address || city,
                imageUrl: event.thumbnail || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070",
                startDateTime: event.date?.startDate ? new Date(event.date.startDate) : new Date(),
                price: event.offers?.[0]?.price || 'Check Details',
                isFree: event.offers?.[0]?.price === '0' || !event.offers,
                url: event.link || `https://www.google.com/search?q=${encodeURIComponent(event.title + " " + city)}`,
                category: isLive ? "LIVE NOW" : (category || "Trending"),
                currency: 'INR'
            };
        });
    } catch (error) {
        console.error("External discovery failed:", error);
        return getCuratedEvents(city, query);
    }
}

function getCuratedEvents(city: string, query: string) {
    const allEvents = [
        {
            id: 'cur_1',
            title: 'Aura Horizon: Tech Summit',
            description: 'The flagship Aura conference for developers and visionaries.',
            location: 'Jio World Centre, Mumbai',
            imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad05823c95b?q=80&w=1080',
            startDateTime: new Date('2026-06-15T09:00:00Z'),
            price: '2499',
            isFree: false,
            url: 'https://www.google.com/search?q=Aura+Horizon+Tech+Summit',
            category: 'UPCOMING',
            currency: 'INR'
        },
        {
            id: 'cur_2',
            title: 'Global Vibes Festival',
            description: 'International music and food festival curated for the Aura community.',
            location: 'Palace Grounds, Bangalore',
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1080',
            startDateTime: new Date('2026-07-20T16:00:00Z'),
            price: '1500',
            isFree: false,
            url: 'https://www.google.com/search?q=Global+Vibes+Festival',
            category: 'SCHEDULED',
            currency: 'INR'
        },
        {
            id: 'cur_3',
            title: 'Innovators Dinner',
            description: 'An exclusive networking event for Micro-Crew leaders.',
            location: 'Aer, Worli, Mumbai',
            imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1080',
            startDateTime: new Date(),
            price: '5000',
            isFree: false,
            url: 'https://www.google.com/search?q=Innovators+Dinner+Mumbai',
            category: 'LIVE NOW',
            currency: 'INR'
        }
    ];

    return allEvents;
}
