"use client";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./KakaoLoginButton.module.css";
import kakao from "../../../../public/icons/kakao.png";
import Image from "next/image";

function KakaoLoginButton() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/"); // 홈으로 이동
    }
  }, [session, router]);

  const handleLogin = () => {
    signIn("kakao"); // 카카오 로그인
  };

  return (
    <button onClick={handleLogin} className={styles.button}>
      <Image src={kakao} width={40} alt={"카카오 로그인"}></Image>&nbsp;카카오 로그인
    </button>
  );
}

export default KakaoLoginButton;
