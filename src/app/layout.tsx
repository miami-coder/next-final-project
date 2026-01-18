import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({
    subsets: ["latin"],
    weight: ['300', '400', '600', '700', '800'],
});

export const metadata: Metadata = {
    title: "Movies App",
    description: "Next.js Movie Database with TMDB",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        <Header/>
        {children}
        </body>
        </html>
    );
}