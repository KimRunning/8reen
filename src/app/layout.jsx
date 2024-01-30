import { Jua } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import styles from "./layout.module.css";
import leftArrow from "../../public/icons/back_light_Arrow.png";
import home from "../../public/icons/home.png";
import Navbar from "./components/navbar/navbar";
import Link from "next/link";
import NextAuthSessionProvider from "./components/NextAuthSessionProvider";
import Logout from "./components/logout/logout";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "8REEN",
  description: "친환경 우산 공유 8REEN",
};

export const viewport = {
  themeColor: "#11ff58",
  content: "width=device-width, initial- scale=1.0, user - scalable=no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={jua.className}>
        <NextAuthSessionProvider>
          <header className={styles.header}>
            <div className={styles.homeLoginWrap}>
              <Link href="/">
                <Image src={leftArrow} width={40} alt={"뒤로가기"}></Image>
              </Link>
              <Link href="/">
                <Image src={home} width={40} alt={"홈 화면으로 가기"}></Image>
              </Link>
            </div>
            <Logout></Logout>
          </header>
          <mainContents className={styles.mainContents}>{children}</mainContents>
          <footer className={styles.footer}>
            <Navbar></Navbar>
          </footer>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
