// app/layout.tsx
import "./globals.css";
import Header from "../components/Header";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Freelance Automation Dashboard",
  description: "EvoDynamics — freelance automation dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Header is a client component */}
        <Header />

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}