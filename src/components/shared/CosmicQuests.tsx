import React from 'react';
import {
    Compass,
    Gift,
    Zap,
    Users,
    Calendar,
    Car,
    Award,
    ChevronRight,
    LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Quest {
    id: string;
    title: string;
    description: string;
    reward: string;
    type: 'points' | 'credits';
    icon: LucideIcon;
    color: string;
    category: 'User' | 'Builder';
}

const CosmicQuests = () => {
    const quests: Quest[] = [
        {
            id: '1',
            title: "The Eco-Commuter",
            description: "Carpool to an Elite Event with at least 2 other Aura members.",
            reward: "250 Eco Credits",
            type: 'credits',
            icon: Car,
            color: "text-emerald-400",
            category: 'User',
        },
        {
            id: '2',
            title: "Vibe Architect",
            description: "Host your first public event and reach 10+ attendees.",
            reward: "500 Aura Points",
            type: 'points',
            icon: Calendar,
            color: "text-primary",
            category: 'Builder',
        },
        {
            id: '3',
            title: "Community Catalyst",
            description: "Submit 5 verified interest-badges to help AI crew matching.",
            reward: "150 Aura Points",
            type: 'points',
            icon: Users,
            color: "text-blue-400",
            category: 'User',
        },
        {
            id: '4',
            title: "Super-Nova Streak",
            description: "Maintain a 7-day daily login and interaction streak.",
            reward: "100 Aura Points",
            type: 'points',
            icon: Zap,
            color: "text-orange-400",
            category: 'User',
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Compass className="w-10 h-10 text-primary" />
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Cosmic Quests</h2>
                        <p className="text-sm text-white/40">Ways to earn your Aura reputation</p>
                    </div>
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary uppercase tracking-widest text-[10px]">
                    New Quests Weekly
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests.map((quest) => (
                    <div key={quest.id} className="glassmorphism rounded-3xl border border-white/10 p-6 hover:border-primary/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                            <quest.icon className="w-16 h-16" />
                        </div>

                        <div className="flex items-start justify-between mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl bg-white/5 ${quest.color}`}>
                                <quest.icon className="w-6 h-6" />
                            </div>
                            <Badge className={`${quest.category === 'Builder' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'} border-none`}>
                                {quest.category}
                            </Badge>
                        </div>

                        <div className="relative z-10">
                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{quest.title}</h4>
                            <p className="text-sm text-white/60 leading-relaxed mb-6">
                                {quest.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Gift className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-400 font-black text-sm">{quest.reward}</span>
                                </div>
                                <Link href="/#events">
                                    <Button size="sm" variant="ghost" className="text-white hover:text-primary h-8 px-2 gap-1">
                                        Start Quest <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-8 rounded-[32px] bg-gradient-to-r from-primary/20 to-transparent border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Award className="w-12 h-12 text-primary" />
                    <div>
                        <h4 className="text-xl font-bold text-white">Refer a Cosmic Builder</h4>
                        <p className="text-sm text-white/40">Earn 1000 Aura Points for every friend who hosts an event.</p>
                    </div>
                </div>
                <Button className="rounded-full bg-primary hover:bg-primary/90 px-8 py-6 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                        Share Referral Link
                        <Badge className="bg-white/20 text-[8px] uppercase border-none">Coming Soon</Badge>
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default CosmicQuests;
