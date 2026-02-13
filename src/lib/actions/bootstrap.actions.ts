"use server";

import { db } from "@/lib/db";

export async function bootstrapAura() {
    try {
        const categoryCount = await db.category.count();
        if (categoryCount === 0) {
            console.log("Bootstrapping categories...");
            const categoryNames = [
                'Music', 'Nightlife', 'Workshops', 'Wellness', 'Tech', 'Art & Culture', 'Sports', 'Networking', 'Hackathons'
            ];

            await db.category.createMany({
                data: categoryNames.map(name => ({ name })),
            });
            console.log("Categories bootstrapped.");
        }

        // Gold Standard Event Boostrap (for internal payment testing)
        const eventCount = await db.event.count();
        if (eventCount === 0) {
            console.log("Checking for users to bootstrap test event...");
            const firstUser = await db.user.findFirst();
            const firstCategory = await db.category.findFirst();

            if (firstUser && firstCategory) {
                console.log("Bootstrapping Aura Gold Standard Event...");
                await db.event.create({
                    data: {
                        title: 'Aura Genesis: The VIP Experience',
                        description: 'This is the official Aura test event for validating payment flows and social features. Experience the premium glassmorphism vibe first-hand.',
                        location: 'Aura Digital Arena, Mumbai',
                        imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
                        startDateTime: new Date(Date.now() + 86400000), // Tomorrow
                        endDateTime: new Date(Date.now() + 172800000), // Day after
                        price: '499',
                        currency: 'INR',
                        isFree: false,
                        categoryId: firstCategory.id,
                        organizerId: firstUser.id,
                        url: '#'
                    }
                });
                console.log("Gold Standard Event active linked to User:", firstUser.username);
            } else {
                console.warn("Bootstrap Pending: No user or category found. Event will be created upon first sign-in.");
            }
        } else {
            console.log("Aura already contains events. Skipping bootstrap.");
        }
    } catch (error) {
        console.error("Bootstrap failed:", error);
    }
}
