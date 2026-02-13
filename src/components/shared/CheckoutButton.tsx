"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { getUserByClerkId } from '@/lib/actions/user.actions'

const CheckoutButton = ({ event }: { event: any }) => {
    const { user } = useUser();
    const [mongoUserId, setMongoUserId] = useState<string>('');
    const clerkId = user?.id || '';
    const userIdFromMeta = (user?.publicMetadata?.userId as string) || '';
    const hasEventFinished = event?.endDateTime ? new Date(event.endDateTime) < new Date() : false;

    useEffect(() => {
        const resolveUserId = async () => {
            if (userIdFromMeta) {
                setMongoUserId(userIdFromMeta);
            } else if (clerkId) {
                const dbUser = await getUserByClerkId(clerkId);
                if (dbUser?.id) {
                    setMongoUserId(dbUser.id);
                }
            }
        };
        resolveUserId();
    }, [clerkId, userIdFromMeta]);

    return (
        <div className="flex items-center gap-3">
            {hasEventFinished ? (
                <p className="p-2 text-red-400 font-semibold italic">Sorry, tickets are no longer available. Keep an eye on the next vibe!</p>
            ) : (
                <>
                    <SignedOut>
                        <Button asChild className="button rounded-full bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg shadow-xl shadow-primary/20" size="lg">
                            <Link href="/sign-in">
                                Get Tickets
                            </Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <Checkout event={event} userId={mongoUserId} />
                    </SignedIn>
                </>
            )}
        </div>
    )
}

export default CheckoutButton
