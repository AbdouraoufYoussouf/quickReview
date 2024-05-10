"use client"

import { ThemeProviderProps } from "next-themes/dist/types"
import {ThemeProvider as NextThemeProvider} from "next-themes"

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <NextThemeProvider {...props}>
      {children}
    </NextThemeProvider>
  )
}
