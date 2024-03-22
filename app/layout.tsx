import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // eslint-disable-line

import "./globals.css";
import ReduxProvider from "../redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar";
import { LocationProvider } from "@/context/LocationProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Jobit",
  description: "Job finder for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <LocationProvider>
        <body>
          <ReduxProvider>
            <NavBar />
            {children}
            <Toaster />
          </ReduxProvider>
        </body>
      </LocationProvider>
    </html>
  );
}
