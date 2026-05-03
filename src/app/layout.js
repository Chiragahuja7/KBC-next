import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "../components/ConditionalHeader";
import ConditionalFooter from "../components/ConditionalFooter";
import { CartContext, CartProvider } from "../Context/CartContext";
import { themeConfig } from "../data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kunj Bihari Collections",
  description: "Shop premium collections at Kunj Bihari Collections",
  icons: {
    icon: [
      { url: "/assets/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/assets/logo.svg",
    apple: "/assets/logo.svg",
  },
  openGraph: {
    title: "Kunj Bihari Collections",
    description: "Shop premium collections at Kunj Bihari Collections",
    url: "https://kunjbihari.com",
    siteName: "Kunj Bihari Collections",
    images: [
      {
        url: "/assets/kbc_logo.png",
        width: 1200,
        height: 630,
        alt: "Kunj Bihari Collections Logo",
      },
      {
        url: "/assets/logo.svg",
        width: 512,
        height: 512,
        alt: "Kunj Bihari Collections SVG Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunj Bihari Collections",
    description: "Shop premium collections at Kunj Bihari Collections",
    images: ["/assets/kbc_logo.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        style={{
          '--primary': themeConfig.primary,
          '--primary-hover': themeConfig.primaryHover,
          '--primary-light': themeConfig.primaryLight,
        }}
      >
        <CartProvider>
          <ConditionalHeader />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <main className="grow">
          {children}
        </main>
        <ConditionalFooter/>
        </CartProvider>
      </body>
    </html>
  );
}
