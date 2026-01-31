import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/animations.css";
import "../styles/globals.css";
import "../styles/theme.css";

import { ThemeProvider } from "@/contexts/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mateus Diális",
  description: "Criado com Next.js e Tailwind v4",
  icons: {
    icon: [{ url: "/icon.png", sizes: "128x128", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.className} bg-base-200 text-base-content`}
      >
        <div className="flex flex-col min-h-screen">
          <ThemeProvider>
            <div className="fixed top-0 left-0 w-full z-50">
              <Navbar />
            </div>

            <div className="pt-15 min-h-screen">{children}</div>

            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
