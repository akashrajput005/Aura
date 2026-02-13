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
            console.log(`User ${clerkId} not found in DB. Attempting JIT Sync...`);

            const clerkUser = await currentUser();

            if (clerkUser && clerkUser.id === clerkId) {
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
                console.log(`JIT Sync successful for user: ${clerkId}`);
            } else {
                return null;
            }
        }

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log("getUserByClerkId Error:", error);
        return null;
    }
}
