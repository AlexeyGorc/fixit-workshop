import type { Metadata } from "next";
import {Raleway} from "next/font/google";
import "./globals.css";
import styles from './layout.module.css';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '600', '700', '800'],
    display: 'swap',
});

export const metadata: Metadata = {
  title: "FixIt Workshop",
  description: "На сайте мастерской представлены предлагаемые услуги, цены и примеры выполненных работ",
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${raleway.className} antialiased`}
      >
      <div className={styles.wrapper}>
          <Header />
          {children}
          <Footer />
      </div>

      </body>
    </html>
  );
}
