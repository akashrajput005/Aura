import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Ticket, Calendar, ShieldCheck, Zap } from "lucide-react";
import React from "react";

type ProfileHeaderProps = {
    user: any;
    ordersCount: number;
    eventsCount: number;
};

const ProfileHeader = ({ user, ordersCount, eventsCount }: ProfileHeaderProps) => {
    return (
        <section className="relative w-full py-12 px-6 md:px-12 overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-[#030712]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="wrapper glassmorphism border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                {/* Decorative mesh inside the card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-700" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Avatar with Glow */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-pink-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#030712] relative">
                            <AvatarImage src={user.photo} alt={user.username} className="object-cover" />
                            <AvatarFallback className="bg-white/10 text-white text-4xl">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-2 right-2 bg-primary rounded-full p-2 border-2 border-[#030712] shadow-lg">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="h1-bold text-white tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <Badge className="w-fit mx-auto md:mx-0 bg-primary/20 text-primary border-primary/30 py-1 px-4 rounded-full backdrop-blur-md">
                                Genesis Founding Member
                            </Badge>
                        </div>
                        <p className="text-xl text-white/60 mb-8 flex items-center justify-center md:justify-start gap-2">
                            <span className="text-primary font-medium">@</span>
                            {user.username}
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group/stat">
                                <p className="text-white/40 text-[10px] mb-1 flex items-center gap-2 uppercase tracking-widest font-black">
                                    <Zap className="w-3.5 h-3.5 text-primary" /> Aura Energy
                                </p>
                                <p className="text-2xl font-black text-white">{user.auraPoints || 1250} <span className="text-[10px] font-bold text-white/40 uppercase">Pts</span></p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group/stat">
                                <p className="text-white/40 text-[10px] mb-1 flex items-center gap-2 uppercase tracking-widest font-black">
                                    <Ticket className="w-3.5 h-3.5 text-emerald-400" /> Bio-Impact
                                </p>
                                <p className="text-2xl font-black text-emerald-400">{user.ecoCredits || 450} <span className="text-[10px] font-bold text-emerald-500/40 uppercase">Eco</span></p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group/stat">
                                <p className="text-white/40 text-[10px] mb-1 flex items-center gap-2 uppercase tracking-widest font-black italic">
                                    Streak
                                </p>
                                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">{user.streak || 5} <span className="text-[10px] font-bold text-white/40 uppercase">Days</span></p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer group/stat">
                                <p className="text-white/40 text-[10px] mb-1 flex items-center gap-2 uppercase tracking-widest font-black">
                                    Rank
                                </p>
                                <p className="text-2xl font-black text-pink-500">Elite</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileHeader;
