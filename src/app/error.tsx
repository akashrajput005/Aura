'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Global Application Error:', error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gradient-bg p-6 text-center">
            <div className="glassmorphism p-10 rounded-3xl border border-white/10 max-w-md shadow-2xl">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Aura Encountered a Vibe Shift</h2>
                <p className="text-white/60 mb-8">
                    The application ran into an unexpected issue. Don't worry, your energy is protected.
                </p>
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg"
                    >
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button variant="ghost" className="text-white/70 hover:text-white w-full">
                            Return to Discovery
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
