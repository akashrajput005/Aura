"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert, MapPin, CheckCircle, Wifi, Users, X, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GuardianSOS = ({ eventTitle }: { eventTitle: string }) => {
    const [isDistressActive, setIsDistressActive] = useState(false);
    const [signalStep, setSignalStep] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [isCounting, setIsCounting] = useState(false);
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isCounting && countdown > 0) {
            timerRef.current = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        } else if (isCounting && countdown === 0) {
            handleSOS();
            setIsCounting(false);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [isCounting, countdown]);

    const startCountdown = () => {
        setIsCounting(true);
        setCountdown(3);

        // Fetch real location if possible
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => console.warn("Location access denied", err)
            );
        }
    };

    const cancelCountdown = () => {
        setIsCounting(false);
        setCountdown(3);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const handleSOS = () => {
        setIsDistressActive(true);
        setSignalStep(1);

        // Mocking sophisticated API calls
        setTimeout(() => setSignalStep(2), 1500);
        setTimeout(() => setSignalStep(3), 3000);
    };

    return (
        <div className={`p-6 rounded-3xl border glassmorphism mt-6 transition-all duration-500 ${isDistressActive ? 'bg-red-500/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-red-500/5 border-red-500/20'}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <ShieldAlert className={`w-8 h-8 ${isDistressActive ? 'text-red-500 animate-ping' : 'text-red-400'}`} />
                    <div>
                        <h3 className="text-xl font-bold text-white">Guardian Protocol</h3>
                        <p className="text-xs text-red-200/60">Real-time Safety Network</p>
                    </div>
                </div>
                {isDistressActive && (
                    <Badge className="bg-red-600 animate-pulse">EMERGENCY ACTIVE</Badge>
                )}
            </div>

            {!isCounting && !isDistressActive && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full py-7 rounded-2xl font-black text-lg shadow-xl shadow-red-500/10 hover:shadow-red-500/20 transition-all">
                            ACTIVATE SOS SIGNAL
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-950 border-red-500/30 text-white rounded-3xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-red-500 flex items-center gap-2 text-2xl">
                                <AlertTriangle className="w-8 h-8" /> Emergency Alert
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400 text-base">
                                This will broadcast your current location to event security and the Aura Guardian network at <b>{eventTitle}</b>.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-6 flex gap-3">
                            <AlertDialogCancel className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 py-6">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={startCountdown} className="rounded-xl bg-red-600 hover:bg-red-700 py-6">
                                Confirm & Track
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            {isCounting && (
                <div className="flex flex-col items-center gap-4 py-4 animate-in zoom-in duration-300">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-red-500/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
                        <span className="text-4xl font-black text-white">{countdown}</span>
                    </div>
                    <p className="text-red-400 font-bold animate-pulse">BROADCASTING IN {countdown}S...</p>
                    <Button onClick={cancelCountdown} variant="outline" size="sm" className="rounded-full border-white/20 text-white hover:bg-white/10">
                        <X className="w-4 h-4 mr-2" /> Abort Signal
                    </Button>
                </div>
            )}

            {signalStep > 0 && (
                <div className="mt-4 space-y-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 text-sm">
                        {signalStep >= 1 ? <CheckCircle className="text-emerald-500 w-5 h-5" /> : <div className="w-5 h-5 rounded-full border border-white/20" />}
                        <div className="flex flex-col">
                            <span className={signalStep >= 1 ? "text-white font-medium" : "text-white/40"}>GPS Lock Secured</span>
                            {location && <span className="text-[10px] text-emerald-400/70">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        {signalStep >= 2 ? <CheckCircle className="text-emerald-500 w-5 h-5" /> : <div className="w-5 h-5 rounded-full border border-white/20" />}
                        <span className={signalStep >= 2 ? "text-white font-medium" : "text-white/40"}>Aura SafetyCloud™ Alert Sent</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        {signalStep >= 3 ? <Wifi className="text-red-500 w-5 h-5 animate-ping" /> : <div className="w-5 h-5 rounded-full border border-white/20" />}
                        <div className="flex flex-col">
                            <span className={signalStep >= 3 ? "text-red-400 font-bold" : "text-white/40"}>Guardian Network: Active</span>
                            {signalStep >= 3 && <span className="text-[10px] text-red-200/50 italic">5 local Guardians alerted & tracking</span>}
                        </div>
                    </div>

                    {signalStep >= 3 && (
                        <Button
                            variant="outline"
                            className="w-full mt-2 rounded-xl border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={() => { setIsDistressActive(false); setSignalStep(0); }}
                        >
                            I am Safe Now
                        </Button>
                    )}
                </div>
            )}

            {!isDistressActive && !isCounting && (
                <div className="mt-4 flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest justify-center">
                    <MapPin className="w-3 h-3" /> Geo-Fencing Active
                    <span className="mx-2">|</span>
                    <Users className="w-3 h-3" /> 124 Buddies Nearby
                </div>
            )}
        </div>
    );
};

export default GuardianSOS;
