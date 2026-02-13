"use client";

import React from "react";
import {
    Coins,
    ArrowUpRight,
    Clock,
    Zap,
    TrendingUp,
    ShieldCheck,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface VaultProps {
    user: {
        auraPoints?: number;
        ecoCredits?: number;
        [key: string]: unknown;
    };
    orders?: Array<{
        id: string;
        totalAmount: string | number;
        createdAt?: string | Date;
        event?: {
            title: string;
        };
    }>;
}

const AuraVault = ({ user, orders = [] }: VaultProps) => {
    // Generate dynamic ledger based on real orders and simulated point activities
    interface LedgerItem {
        id: string;
        type: 'earn' | 'burn' | 'eco';
        amount: string | number;
        label: string;
        date: string;
    }

    // Convert real orders to ledger items
    const orderLedgerItems: LedgerItem[] = orders.slice(0, 3).map((order) => ({
        id: order.id,
        type: 'burn',
        amount: order.totalAmount,
        label: `Vibe Ticket: ${order.event?.title || 'Unknown Event'}`,
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'
    }));

    // Add Simulated Point Earning events if user has points/credits
    const simulatedActivities: LedgerItem[] = [];

    if (user.auraPoints && user.auraPoints > 0) {
        simulatedActivities.push({
            id: 'streak-1',
            type: 'earn',
            amount: 50,
            label: 'Aura Daily Streak Bonus',
            date: '2 hours ago'
        });
    }

    if (user.ecoCredits && user.ecoCredits > 0) {
        simulatedActivities.push({
            id: 'eco-1',
            type: 'eco',
            amount: 100,
            label: 'Carpooling Verified',
            date: 'Yesterday'
        });
    }

    const mergedLedger = [...orderLedgerItems, ...simulatedActivities].slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Balance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden group p-8 rounded-[32px] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 glassmorphism">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-primary/20">
                                <Zap className="w-5 h-5 text-primary fill-primary/30" />
                            </div>
                            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Aura Points</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-black text-white">{user.auraPoints || 0}</h3>
                            <Badge className="mb-2 bg-emerald-500/20 text-emerald-400 border-none">+0%</Badge>
                        </div>
                        <p className="text-sm text-white/40 mt-2">Next reward at 1500</p>
                    </div>
                </div>

                <div className="relative overflow-hidden group p-8 rounded-[32px] bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 glassmorphism">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-emerald-500/20">
                                <Coins className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Eco Credits</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-black text-white">{user.ecoCredits || 0}</h3>
                            <span className="mb-2 text-xs text-white/40">~ $0.00</span>
                        </div>
                        <p className="text-sm text-white/40 mt-2">Claimed via green actions</p>
                    </div>
                </div>

                <div className="relative overflow-hidden group p-8 rounded-[32px] bg-white/5 border border-white/10 glassmorphism">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-white/10">
                                <CreditCard className="w-5 h-5 text-white/60" />
                            </div>
                            <span className="text-sm font-bold text-white/60 uppercase tracking-widest">Account Tier</span>
                        </div>
                        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary">Founder</h3>
                        <p className="text-sm text-white/40 mt-2">Elite Status: Lifetime Access</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Points Ledger */}
                <div className="glassmorphism rounded-[32px] border border-white/10 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white/5">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold text-white">Points Ledger</h4>
                        </div>
                        <Link href="/orders">
                            <Button variant="ghost" className="text-primary hover:text-primary/80">View All Activity</Button>
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {mergedLedger.length === 0 ? (
                            <p className="text-white/20 italic text-center py-10">No recent activity detected.</p>
                        ) : mergedLedger.map((item) => (
                            <div key={item.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${item.type === 'earn' ? 'bg-primary/10' :
                                        item.type === 'eco' ? 'bg-emerald-500/10' :
                                            'bg-red-500/10'
                                        }`}>
                                        {item.type === 'earn' ? <Zap className="w-5 h-5 text-primary" /> :
                                            item.type === 'eco' ? <Coins className="w-5 h-5 text-emerald-400" /> :
                                                <ArrowUpRight className="w-5 h-5 text-red-400" />}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium group-hover:text-primary transition-colors">{item.label}</p>
                                        <p className="text-xs text-white/40">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${item.type === 'earn' ? 'text-primary' :
                                        item.type === 'eco' ? 'text-emerald-400' :
                                            'text-white'
                                        }`}>
                                        {item.type === 'burn' ? '-' : '+'}{item.amount}
                                    </p>
                                    <p className="text-[8px] uppercase font-bold text-white/20 tracking-tighter">
                                        {item.type === 'eco' ? 'Credits' : 'Points'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full mt-8 rounded-2xl bg-primary hover:bg-primary/90 py-6 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center justify-center">
                            <TrendingUp className="mr-2 w-5 h-5" /> Analytics Dashboard
                            <Badge className="ml-2 bg-white/20 text-[8px] uppercase border-none">Coming Phase 2</Badge>
                        </span>
                    </Button>
                </div>

                {/* Safety & Trust Section */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-8 rounded-[32px] border border-blue-500/20 glassmorphism flex-1">
                        <ShieldCheck className="w-12 h-12 text-blue-400 mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">Vault Protection Active</h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Your cosmic assets are secured with end-to-end encryption. Transaction verification is powered by Aura Identity Protocol.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                2FA Security Enabled
                            </li>
                            <li className="flex items-center gap-2 text-sm text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Instant Verification
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuraVault;
