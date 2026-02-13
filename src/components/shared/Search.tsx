"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = ({ placeholder = 'Search events...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = '';

            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: query
                })
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }

            router.push(newUrl, { scroll: false });
        }, 300)

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router])

    return (
        <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-white/5 border border-white/10 px-4 py-2">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="p-regular-16 border-0 bg-transparent outline-offset-0 placeholder:text-muted-foreground focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
            />
        </div>
    )
}

export default Search
