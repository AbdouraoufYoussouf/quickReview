"use client"

import React, { FC, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'


interface SessionProviderProps{
    children: ReactNode;
}
const ProviderSession:FC<SessionProviderProps> = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ProviderSession