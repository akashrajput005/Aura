"use client"

import dynamic from "next/dynamic";
import React from "react";

const EventMap = dynamic(() => import("./EventMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-3xl mt-10 border border-white/10" />
});

const EventMapWrapper = ({ location }: { location: string }) => {
    return <EventMap location={location} />;
};

export default EventMapWrapper;
