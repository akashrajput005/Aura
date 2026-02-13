"use server";

import { db } from "@/lib/db";

export async function getUserByClerkId(clerkId: string) {
    try {
        let user = await db.user.findUnique({
            where: { clerkId },
        });

        // Self-healing: If user exists in Clerk but not in DB, we should create him
        // However, we usually rely on webhooks. This is a fail-safe.
        if (!user) {
            console.log(`User ${clerkId} not found in DB. Check webhook logs.`);
            return null;
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log("getUserByClerkId Error:", error);
        return null;
    }
}
