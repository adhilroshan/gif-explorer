import type { Metadata, Viewport } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap',
});

const righteous = Righteous({
  weight: ['400'],
  subsets: ["latin"],
  variable: "--font-righteous",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "GIF Explorer - Search & Discover Amazing GIFs",
  description: "Explore and search through thousands of GIFs powered by Giphy API",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f23" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${righteous.variable} transition-colors duration-200`}>
      <body className="antialiased transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
