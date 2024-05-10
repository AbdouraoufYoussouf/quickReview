
"use client"

import ProviderSession from "@/src/components/auth/SessionProvider";
import { Navbar } from "@/src/components/Navbar";
import { ThemeProvider } from "@/src/theme/ThemeProvider";

export default function App({ children, }: Readonly<{ children: React.ReactNode; }>) {


    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProviderSession>
                <div className="flex w-full flex-col h-full items-center">
                    <Navbar />
                    <div className=" w-full py-4 ">
                        {children}
                    </div>
                </div>
            </ProviderSession>
        </ThemeProvider>
    );
}
