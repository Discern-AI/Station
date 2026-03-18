import "./globals.css";
import type { Metadata } from "next";
import { TopNav } from "@/components/nav/top-nav";

export const metadata: Metadata = {
  title: "Station",
  description: "Station Studio Alpha",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
