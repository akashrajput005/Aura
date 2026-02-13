import React from 'react'

const EventSkeleton = () => {
    return (
        <div className="group relative flex min-h-[420px] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 animate-pulse">
            <div className="aspect-video bg-white/10" />
            <div className="flex flex-col gap-3 p-6 md:gap-4">
                <div className="flex gap-2">
                    <div className="h-6 w-20 rounded-full bg-white/10" />
                    <div className="h-6 w-24 rounded-full bg-white/10" />
                </div>
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-8 w-full bg-white/10 rounded" />
                <div className="flex-between w-full mt-2">
                    <div className="h-4 w-24 bg-white/10 rounded" />
                </div>
                <div className="h-4 w-40 bg-white/10 rounded mt-1" />
            </div>
        </div>
    )
}

export const CollectionSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <EventSkeleton key={i} />
            ))}
        </div>
    )
}

export default EventSkeleton
