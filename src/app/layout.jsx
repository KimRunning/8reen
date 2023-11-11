import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "8REEN",
  description: "친환경 우산 공유 8REEN",
};

export const viewport = {
  themeColor: "#11ff58",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
