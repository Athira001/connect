import type { Metadata } from "next";
import ReduxProvider from "./store/redux-provider";
import {  Geist_Mono, Roboto } from "next/font/google";

import Header from "./components/organisms/header";
import Footer from "./components/organisms/footer"
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: '600',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store - CONNECT",
  description: "Buy, Sell, and Download FREE 3D Garment, Fabric, Trim, Avatar and Scene assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <Header></Header>
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
