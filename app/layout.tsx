import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PINSeek",
  description: "A simple app to find your PIN code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames("m-0 p-0 bg-black", inter.className)}>
        {children}
      </body>
    </html>
  );
}
