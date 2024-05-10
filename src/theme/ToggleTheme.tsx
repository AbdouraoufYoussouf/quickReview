"use client"

import React from 'react'
import { SunMoon, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../components/ui/button';

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button className='px-2'
      variant={'ghost'}  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Moon className=' rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0' />
      <SunMoon className=' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Theme toggle</span>
    </Button>
  )
}
