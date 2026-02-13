"use client";

import React from "react";
import {
    Sparkles,
    Flame,
    Users,
    Trophy,
    Target,
    Zap,
    MessageSquare,
    Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CrewMatch from "./VibeMatch";

interface NexusProps {
    user: {
        streak?: number;
        [key: string]: unknown;
    };
}

const AuraNexus = ({ user }: NexusProps) => {
    interface Interest {
        name: string;
        streak: number;
        icon: React.ReactNode;
        color: string;
    }

    const interests: Interest[] = [
        { name: "TechStack", streak: user.streak || 5, icon: <Zap className="w-4 h-4" />, color: "text-blue-400" },
        { name: "VibeSeeker", streak: 12, icon: <Flame className="w-4 h-4" />, color: "text-orange-500" },
        { name: "EcoWarrior", streak: 3, icon: <Star className="w-4 h-4" />, color: "text-emerald-400" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Interest Streaks Section */}
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-orange-500/10">
                            <Flame className="w-5 h-5 text-orange-500" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">Interest Streaks</h4>
                    </div>
                    <Badge variant="outline" className="text-orange-500 border-orange-500/30">Hottest in City</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interests.map((interest) => (
                        <div key={interest.name} className="glassmorphism p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                {interest.icon}
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`${interest.color} font-bold`}>#</span>
                                <h5 className="font-bold text-white group-hover:text-primary transition-colors">{interest.name}</h5>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-4xl font-black text-white">{interest.streak}</div>
                                <div className="text-xs text-white/40 leading-tight uppercase font-bold tracking-tighter">
                                    Day<br />Streak
                                </div>
                            </div>
                            <div className="mt-6 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-pink-500"
                                    style={{ width: `${(interest.streak / 30) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Crew Insights */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glassmorphism rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-6 h-6 text-primary" />
                                <h4 className="text-xl font-bold text-white">Aura AI Insights</h4>
                            </div>
                            <p className="text-white/70 leading-relaxed mb-8">
                                Based on your cosmic frequency, you align most with the <span className="text-primary font-bold">Elite Tech Crew</span>. You&apos;ve participated in 4 events this month, placing you in the top 2% of curators in Bangalore.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-4 h-4 text-white/40" />
                                        <span className="text-[10px] uppercase font-bold text-white/40">Crew Status</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">Elite Curator</p>
                                </div>
                                <div className="bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Trophy className="w-4 h-4 text-white/40" />
                                        <span className="text-[10px] uppercase font-bold text-white/40">Badges Earned</span>
                                    </div>
                                    <p className="text-lg font-bold text-white">12 Cosmic</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CrewMatch />
                </div>

                {/* Achievement Goal */}
                <div className="glassmorphism rounded-3xl border border-white/10 p-8 flex flex-col justify-center text-center">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-lg shadow-primary/20">
                        <Target className="w-10 h-10 text-primary" />
                    </div>
                    <h5 className="text-xl font-bold text-white mb-2">Next Milestone</h5>
                    <p className="text-sm text-white/40 mb-6 font-medium">Attend 1 more Eco-Vibe event to unlock the &quot;Green Guardian&quot; badge.</p>
                    <Link href="/#events" className="w-full">
                        <Button variant="outline" className="w-full rounded-full border-primary/30 text-primary hover:bg-primary/10">
                            Explore Events
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Social Hub Quick Links */}
            <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="ghost" className="text-white/60 hover:text-white gap-2">
                    <MessageSquare className="w-4 h-4" /> Crew Chat
                </Button>
                <Button variant="ghost" className="text-white/60 hover:text-white gap-2">
                    <Users className="w-4 h-4" /> Discover Peers
                </Button>
                <Button variant="ghost" className="text-white/60 hover:text-white gap-2">
                    <Star className="w-4 h-4" /> Leaderboard
                </Button>
            </div>
        </div>
    );
};

export default AuraNexus;
