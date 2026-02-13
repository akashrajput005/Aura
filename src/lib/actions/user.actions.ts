"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserByClerkId(clerkId: string) {
    try {
        let user = await db.user.findUnique({
            where: { clerkId },
        });

        // Self-healing / JIT Sync: If user exists in Clerk but not in DB, create them
        if (!user) {
            console.log(`[JIT] User ${clerkId} not found in MongoDB. Starting sync...`);

            const clerkUser = await currentUser();

            if (!clerkUser) {
                console.error(`[JIT] Failed: currentUser() returned null for ${clerkId}. Check CLERK_SECRET_KEY.`);
                return null;
            }

            if (clerkUser.id !== clerkId) {
                console.error(`[JIT] Failed: ID mismatch. Clerk: ${clerkUser.id} vs Request: ${clerkId}`);
                return null;
            }

            console.log(`[JIT] Clerk user found: ${clerkUser.emailAddresses[0].emailAddress}. Creating DB record...`);

            user = await db.user.create({
                data: {
                    clerkId: clerkUser.id,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split('@')[0],
                    firstName: clerkUser.firstName,
                    lastName: clerkUser.lastName,
                    photo: clerkUser.imageUrl,
                }
            });
            console.log(`[JIT] Sync successful for ${clerkId}. MongoDB ID: ${user.id}`);
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        console.error(`[JIT] CRITICAL DATABASE ERROR for ${clerkId}:`, error.message || error);
        if (error.code) console.error(`[JIT] Error Code: ${error.code}`);
        return null;
    }
}
