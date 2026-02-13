"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Zap, ShieldCheck, Sparkles, MessageSquare, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CrewMatch = () => {
    const [matching, setMatching] = useState(false);
    const [matched, setMatched] = useState(false);
    const [matchProgress, setMatchProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (matching) {
            interval = setInterval(() => {
                setMatchProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setMatching(false);
                        setMatched(true);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [matching]);

    const startMatch = () => {
        setMatching(true);
        setMatchProgress(0);
    }

    return (
        <div className="p-8 rounded-[32px] bg-primary/10 border border-primary/20 glassmorphism flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    <div>
                        <h3 className="text-xl font-bold text-white">Aura Crew-Match</h3>
                        <p className="text-sm text-primary/70">AI Micro-Crew Formation</p>
                    </div>
                </div>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/20 animate-pulse">LIVE AI</Badge>
            </div>

            {!matched ? (
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-white/5 text-white/70">#TechStack</Badge>
                        <Badge variant="secondary" className="bg-white/5 text-white/70">#Networking</Badge>
                        <Badge variant="secondary" className="bg-white/5 text-white/70">#Innovators</Badge>
                    </div>

                    <Button
                        onClick={startMatch}
                        disabled={matching}
                        className="w-full rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 py-6 text-lg font-bold transition-all relative overflow-hidden"
                    >
                        {matching ? (
                            <div className="relative z-10 flex items-center gap-2">
                                <Zap className="animate-spin w-5 h-5" />
                                {matchProgress < 30 ? "Scanning Interests..." :
                                    matchProgress < 70 ? "Filtering Vibe Badges..." :
                                        "Forming Micro-Crew..."}
                            </div>
                        ) : (
                            <span className="relative z-10 flex items-center gap-2">
                                <UserPlus className="w-5 h-5" /> Join Micro-Crew
                            </span>
                        )}
                        {matching && (
                            <div
                                className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-300"
                                style={{ width: `${matchProgress}%` }}
                            />
                        )}
                    </Button>
                </div>
            ) : (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-bold flex items-center gap-2">
                            <Users className="text-primary w-5 h-5" /> Your Micro-Crew:
                        </span>
                        <div className="flex flex-col items-end">
                            <Badge variant="default" className="bg-primary text-white">98% Match Frequency</Badge>
                            <span className="text-[10px] text-white/40 mt-1">Based on Interests &amp; History</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex -space-x-3 overflow-hidden">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="inline-block h-12 w-12 rounded-full ring-4 ring-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-bold">&quot;The Tech Pioneers&quot;</span>
                            <div className="flex gap-1 mt-1">
                                <Badge className="bg-blue-500/20 text-blue-400 border-none text-[8px] px-1">Innovation Badge</Badge>
                                <Badge className="bg-purple-500/20 text-purple-400 border-none text-[8px] px-1">Elite Crew</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Crew identity verified by Aura Guardian
                        </p>
                        <Button className="w-full mt-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-primary" /> Enter Crew Chat
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrewMatch;
