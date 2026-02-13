import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

type TransactionLedgerProps = {
    orders: any[];
};

const TransactionLedger = ({ orders }: TransactionLedgerProps) => {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" /> Payment Ledger
                </h3>
                <p className="text-sm text-white/40">Showing last {orders.length} transactions</p>
            </div>

            <Table>
                <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-white font-semibold py-4">Transaction ID</TableHead>
                        <TableHead className="text-white font-semibold">Event</TableHead>
                        <TableHead className="text-white font-semibold">Date</TableHead>
                        <TableHead className="text-white font-semibold">Amount</TableHead>
                        <TableHead className="text-white font-semibold text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="py-12 text-center text-white/40 italic">
                                No cosmic transactions found yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order) => (
                            <TableRow key={order.id} className="border-white/10 hover:bg-white/5 transition-colors group">
                                <TableCell className="font-mono text-primary text-xs py-5">
                                    {order.stripeId}
                                </TableCell>
                                <TableCell className="text-white font-medium">
                                    <div className="flex flex-col">
                                        <span>{order.event?.title}</span>
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1">
                                            Internal Market
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-white/60">
                                    {formatDateTime(order.createdAt).dateOnly}
                                </TableCell>
                                <TableCell className="text-white font-bold">
                                    {formatPrice(order.totalAmount, order.event?.currency || 'INR')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
                                        Success
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <div className="p-4 bg-white/[0.02] border-t border-white/10 text-center">
                <p className="text-[11px] text-white/30 uppercase tracking-[0.2em]">
                    Secured by Razorpay • Aura Financial Integrity System
                </p>
            </div>
        </div>
    );
};

export default TransactionLedger;
