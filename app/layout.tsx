import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "crakd",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased pattern`}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
