"use client";

import React, { useState } from 'react';
import { TreePine, Zap, Award, Share2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EcoCredits = () => {
    const [points, setPoints] = useState(450);
    const [claimed, setClaimed] = useState(false);

    const claimCredits = () => {
        setClaimed(true);
        setPoints(prev => prev + 50);
    }

    return (
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 glassmorphism mt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20">
                        <TreePine className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Eco-Impact Ledger</h3>
                        <p className="text-xs text-emerald-200/60">Sustainability Rewards Activated</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400 flex items-center gap-1">
                        <Zap className="w-5 h-5 fill-emerald-400" /> {points}
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Aura Credits</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <p className="text-[10px] text-white/50 uppercase mb-1">CO2 Saved</p>
                    <p className="text-lg font-bold text-white">12.4kg</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <p className="text-[10px] text-white/50 uppercase mb-1">Rank</p>
                    <p className="text-lg font-bold text-white">Top 5%</p>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-sm text-white/80 font-medium">Available for this event:</p>
                <div className="flex items-center justify-between bg-emerald-500/5 p-3 rounded-2xl border border-emerald-500/10">
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-white">Carpool/Public Transit Reward</span>
                    </div>
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">+50 Pts</Badge>
                </div>
            </div>

            {!claimed ? (
                <Button
                    onClick={claimCredits}
                    className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6"
                >
                    Claim Sustainable Credits
                </Button>
            ) : (
                <div className="flex flex-col gap-3">
                    <Button disabled className="w-full rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-6">
                        <TrendingUp className="mr-2 w-5 h-5" /> Impact Recorded!
                    </Button>
                    <Button variant="ghost" className="text-xs text-white/60 hover:text-white flex items-center justify-center gap-2">
                        <Share2 className="w-3 h-3" /> Share Impact to Leaderboard
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EcoCredits;
