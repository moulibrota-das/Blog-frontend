"use client";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/authContext";
import Cookies from "js-cookie";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authId, setAuthId] = useState("");
  const [authName, setAuthName] = useState("");
  const [authStatus, setAuthStatus] = useState(false);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthStatus(true);
    }
  }, []);

  return (
    <html lang="en" className={`${GeistSans.className} bg-off-white`}>
      <AuthProvider
        value={{
          authId,
          setAuthId,
          authName,
          setAuthName,
          authStatus,
          setAuthStatus,
          authToken,
          setAuthToken,
        }}
      >
        <body className=" bg-off-white">{children}</body>
      </AuthProvider>
    </html>
  );
}
