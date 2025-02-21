import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

export const metadata: Metadata = {
  title: "QLU Recruiting",
  description: "Connect, communicate, and create with QLU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster position="top-right" reverseOrder={false} />{" "}
          {/* ✅ Global Toast Support */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
