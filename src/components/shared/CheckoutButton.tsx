"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ event }: { event: any }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date();

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
                        <Checkout event={event} userId={userId} />
                    </SignedIn>
                </>
            )}
        </div>
    )
}

export default CheckoutButton
