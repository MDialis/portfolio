import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Portfólio",
  description: "Criado com Next.js e Tailwind v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-base-200 text-base-content transition-colors duration-200`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {children}
            
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
