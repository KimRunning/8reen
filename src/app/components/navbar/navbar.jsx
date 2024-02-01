"use client";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Navbar() {
  const session = useSession().data;
  const router = useRouter();

  const handlePhotoClick = () => {
    if (!session) {
      // 세션이 없는 경우, 경고 메시지를 표시하고 로그인 페이지로 이동합니다.
      alert("로그인이 필요합니다");
      router.push("/logIn"); // 실제 로그인 페이지 URL로 바꿔주세요.
    } else {
      router.push("/photoShot");
    }
  };

  const handleMyInfoClick = () => {
    if (!session) {
      alert("로그인이 필요합니다");
      router.push("/logIn");
    } else {
      router.push(`/myInfo/${session.user.name}`);
    }
  };

  return (
    <>
      <section className={styles.navWrap}>
        <span onClick={handlePhotoClick} className={styles.navbar}>
          Photo
        </span>
        {/* <Link href="/photoShot" className={styles.navbar}>
          photo
        </Link> */}
        {/* <Link href={`/myInfo/${session?.user?.name}`} className={styles.navbar}>
          내정보
        </Link> */}
        <span onClick={handleMyInfoClick} className={styles.navbar}>
          내정보
        </span>
        <Link href="/preparing" className={styles.navbar}>
          Q&A
        </Link>
        <Link href="/preparing" className={styles.navbar}>
          준비중
        </Link>
      </section>
    </>
  );
}

export default Navbar;
