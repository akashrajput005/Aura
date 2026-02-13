"use server";

import { db } from "@/lib/db";

export async function bootstrapAura() {
    try {
        console.log("[Bootstrap] Checking Aura ecosystem status...");
        const categoryCount = await db.category.count();
        const categoryNames = [
            'Music', 'Nightlife', 'Workshops', 'Wellness', 'Tech', 'Art & Culture', 'Sports', 'Networking', 'Hackathons'
        ];

        if (categoryCount < categoryNames.length) {
            console.log(`[Bootstrap] Categories missing (${categoryCount}/${categoryNames.length}). Syncing...`);
            for (const name of categoryNames) {
                await db.category.upsert({
                    where: { name },
                    update: {},
                    create: { name },
                });
            }
            console.log("[Bootstrap] Categories fully synced.");
        }

        const eventCount = await db.event.count();
        if (eventCount === 0) {
            console.log("[Bootstrap] Database empty. Seeding initial events...");

            // 1. Ensure System Admin exists
            let admin = await db.user.findUnique({ where: { email: 'hello@aura.com' } });
            if (!admin) {
                console.log("[Bootstrap] Creating system admin...");
                admin = await db.user.create({
                    data: {
                        clerkId: 'system_admin_aura',
                        email: 'hello@aura.com',
                        username: 'aura_official',
                        firstName: 'Aura',
                        lastName: 'Official',
                        photo: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1080',
                    }
                });
            }

            const musicCat = await db.category.findUnique({ where: { name: 'Music' } });
            const techCat = await db.category.findUnique({ where: { name: 'Tech' } });

            if (admin && musicCat && techCat) {
                console.log("[Bootstrap] Creating Gold Standard Events...");
                await db.event.createMany({
                    data: [
                        {
                            title: 'Zomaland - Mumbai Edition',
                            description: 'The ultimate food and entertainment carnival is back! Multi-stage music, curated food, and the best vibe in Mumbai.',
                            location: 'Jio World Garden, BKC, Mumbai',
                            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1080',
                            startDateTime: new Date('2026-03-15T10:00:00Z'),
                            endDateTime: new Date('2026-03-16T22:00:00Z'),
                            price: '499',
                            isFree: false,
                            url: 'https://zomato.com/zomaland',
                            categoryId: musicCat.id,
                            organizerId: admin.id
                        },
                        {
                            title: 'Google I/O Extended - Aura Edition',
                            description: 'Join the local developer community for an official I/O Extended experience. Deep dives into AI, Web, and the future of Aura.',
                            location: 'Aura Digital Arena, Bangalore',
                            imageUrl: 'https://images.unsplash.com/photo-1540575861501-7ad0582373f3?q=80&w=1080',
                            startDateTime: new Date(Date.now() + 86400000), // Tomorrow
                            endDateTime: new Date(Date.now() + 172800000), // Day after
                            price: '0',
                            isFree: true,
                            url: 'https://events.google.com/io',
                            categoryId: techCat.id,
                            organizerId: admin.id
                        }
                    ]
                });
                console.log("[Bootstrap] Aura seeded successfully.");
            }
        } else {
            console.log(`[Bootstrap] ${eventCount} events found. Ecosystem active.`);
        }
    } catch (error) {
        console.error("[Bootstrap] Critical failure:", error);
    }
}
