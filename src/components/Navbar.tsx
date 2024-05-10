"use client"

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ToggleTheme } from '../theme/ToggleTheme'
import { Button, buttonVariants } from './ui/button'
import { getSession, signOut, useSession } from 'next-auth/react'
import { UserProfile } from './auth/UserProfile'
import { LayoutWrapper } from './ui/LayoutWrapper'

export const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const { theme } = useTheme();
    const pathName = usePathname();

    const { data: session } = useSession()

    // console.log("session", session)

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: '/', label: 'Home', },
        { href: "/parc", label: "Notre flotte" },
        { href: "/apropos", label: "Apropos" },
        { href: "/contact", label: "Contact" }
    ]

    const headerClassName = clsx(
        'fixed bg-background z-50 border-b flex  w-full duration-300 transition-all',
        scrolled && theme === 'light' && 'bg-gray-100',
        scrolled && theme === 'dark' && 'bg-card'
    );

    function handleToggleMenu() {
        setToggleMenu(!toggleMenu)
    }


    return (
        <header className={headerClassName}>
                <nav className={`border-gray-200  z-50 w-full h-full flex items-center justify-center`}>
                    <div className=" flex flex-wrap items-center justify-between  w-full">
                        <div className='pl-4'>
                            <h1>Testimonials</h1>
                        </div>
                        <div className="flex p-3 items-center md:order-2 space-x-2  md:space-x-2 rtl:space-x-reverse">

                            <UserProfile />

                            <ToggleTheme />
                            <span className="sr-only">Open main menu</span>
                            <Button onClick={() => handleToggleMenu()} variant={'outline'} className='px-2 md:hidden'>
                                {
                                    toggleMenu ? <Menu /> : <X />
                                }
                            </Button>
                        </div>
                        <div className={`hidden md:flex items-center justify-between m-1 z-50 border md:border-0  dark:border-gray-700 border-gray-100 rounded-lg w-full md:w-auto md:order-1`} >
                            <ul className="flex flex-col font-medium p-4 md:p-0 gap-2 md:gap-8 md:flex-row md:mt-0 md:border-0">
                                {
                                    navLinks.map(({ label, href }) => {
                                        const isActive = pathName === href;
                                        return (
                                            <li key={href}>
                                                <Link onClick={() => handleToggleMenu()} href={href} className={`block py-2 px-3 md:p-0   hover:scale-105  duration-400 rounded  ${isActive && 'text-blue-700 font-bold'}`} aria-current="page">{label}</Link>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        {
                            !toggleMenu &&

                            <div className="bg-card shadow-[inset_-12px_-8px_40px_#46464620] border-b-2 border-gray-400 md:hidden items-center justify-between  m-1 z-50 md:border-0  md:bg-transparent md:dark:bg-transparent dark:border-gray-700  rounded-lg w-full  md:w-auto md:order-1" >
                                <ul className="flex flex-col font-medium p-4 md:p-0 gap-2 md:gap-8 md:flex-row md:mt-0 md:border-0">
                                    {
                                        navLinks.map(({ label, href }) => {
                                            const isActive = pathName === href;
                                            return (
                                                <li key={href}>

                                                    <Link onClick={() => handleToggleMenu()} href={href} className={`block py-2 px-3 md:p-0 hover:translate-x-1 duration-300  rounded  ${isActive && 'text-blue-700 font-bold  dark:bg-gray-800 bg-gray-300 md:bg-transparent'} hover:bg-gray-300  hover:dark:bg-zinc-700`} aria-current="page">{label}</Link>

                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
        </header>
    )
}
