"use client"

import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavItems = () => {
    const pathname = usePathname();

    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
            {headerLinks.map((link) => {
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                return (
                    <li
                        key={link.route}
                        className={`${isActive && 'text-primary'
                            } flex-center p-medium-16 whitespace-nowrap text-white/70 hover:text-white transition-colors`}
                    >
                        <Link href={link.route}>{link.label}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavItems
