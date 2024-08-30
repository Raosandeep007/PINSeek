import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PINSeek",
  description: "A simple app to find your PIN code",
  creator: "Sandeep yadav",
  keywords: [
    "pincode",
    "pincode search",
    "pincode finder",
    "pincode lookup",
    "pincode search by place",
    "pincode search by postoffice",
    "pincode search by district",
    "pincode search by state",
    "pincode search by taluk",
    "pincode search by village",
    "pincode search by city",
    "pincode search by town",
    "pincode search by locality",
    "pincode search by area",
    "pincode search by region",
    "postal code",
    "postal code search",
    "postal code finder",
    "postal code lookup",
    "postal code search by place",
    "postal code search by postoffice",
    "postal code search by district",
    "postal code search by state",
    "postal code search by taluk",
    "postal code search by village",
    "postal code search by city",
    "postal code search by town",
    "postal code search by locality",
    "postal code search by area",
    "postal code search by region",
    "india pincode",
    "india postal code",
    "india pincode search",
    "india pincode finder",
    "india pincode lookup",
    "india pincode search by place",
    "india pincode search by postoffice",
    "india pincode search by district",
    "india pincode search by state",
    "india pincode search by taluk",
    "india pincode search by village",
    "india pincode search by city",
    "india pincode search by town",
    "india pincode search by locality",
    "india pincode search by area",
    "india pincode search by region",
    "india postal code",
    "india postal code search",
    "india postal code finder",
    "india postal code lookup",
    "india postal code search by place",
    "india postal code search by postoffice",
    "india postal code search by district",
    "india postal code search by state",
    "india postal code search by taluk",
    "india postal code search by village",
    "india postal code search by city",
    "india postal code search by town",
    "india postal code search by locality",
    "india postal code search by area",
    "india postal code search by region",
  ],
  robots: "index, follow",
  publisher: "Sandeep yadav",
  applicationName: "PINSeek",
  metadataBase: new URL("https://pin-seek.vercel.app/"),
  authors: [
    {
      name: "Sandeep yadav",
      url: new URL("https://www.linkedin.com/in/sandeep-yadav-828779149/"),
    },
  ],
  generator: "PINSeek",
  referrer: "no-referrer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL("https://pin-seek.vercel.app/"),
    siteName: "PINSeek",
    title: "PINSeek",
    description: "A simple app to find your PIN code by Sandeep yadav",
    images: [
      {
        url: new URL("https://avatars.githubusercontent.com/u/92537906?v=4"),
        width: 800,
        height: 600,
        alt: "A simple app to find your PIN code",
      },
    ],
    emails: "yadavsandeep775@gmail.com",
  },
  category: "PIN code search",
  classification: "PIN code search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames("m-0 p-0 bg-black min-h-dvh", inter.className)}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
