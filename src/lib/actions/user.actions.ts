"use server";

import { db } from "@/lib/db";

export async function getUserByClerkId(clerkId: string) {
    try {
        const user = await db.user.findUnique({
            where: { clerkId },
        });

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}
