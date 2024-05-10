
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";


import App from "./App";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testimonials",
  description: "app pour ajouter des produits et que les user ajoutes des avis",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
 
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={clsx(inter.className, 'bg-background w-full h-screen ')}>
       <App>{children}</App>
      </body>
    </html>
  );
}
