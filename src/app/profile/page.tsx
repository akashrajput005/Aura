import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const ProfilePage = async (props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParams = await props.searchParams;
    const { userId: clerkId } = await auth();

    const user = await getUserByClerkId(clerkId!);

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const orders = await getOrdersByUser({ userId: user.id, page: ordersPage })

    const orderedEvents = orders?.data.map((order: any) => order.event) || [];
    const organizedEvents = await getEventsByUser({ userId: user.id, page: eventsPage })

    return (
        <div className="flex flex-col min-h-screen gradient-bg">
            <Header />
            {/* My Tickets */}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between px-6 md:px-12">
                    <h3 className='h3-bold text-center sm:text-left text-white'>My Tickets</h3>
                    <Button asChild size="lg" className="button hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-full">
                        <Link href="/#events">
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8 px-6 md:px-12">
                <Collection
                    data={orderedEvents}
                    emptyTitle="No event tickets purchased yet"
                    emptyStateSubtext="No worries - plenty of exciting events to explore!"
                    collectionType="My_Tickets"
                    limit={3}
                    page={ordersPage}
                    urlParamName="ordersPage"
                    totalPages={orders?.totalPages}
                />
            </section>

            {/* Events Organized */}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between px-6 md:px-12">
                    <h3 className='h3-bold text-center sm:text-left text-white'>Events Organized</h3>
                    <Button asChild size="lg" className="button hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-full">
                        <Link href="/events/create">
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8 px-6 md:px-12">
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle="No events have been created yet"
                    emptyStateSubtext="Go create some now!"
                    collectionType="Events_Organized"
                    limit={3}
                    page={eventsPage}
                    urlParamName="eventsPage"
                    totalPages={organizedEvents?.totalPages}
                />
            </section>
            <Footer />
        </div>
    )
}

export default ProfilePage
