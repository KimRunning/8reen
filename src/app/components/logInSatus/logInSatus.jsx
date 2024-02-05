"use client";
import { useSession } from "next-auth/react";
import React from "react";
import styles from "./loginSatus.module.css";
import { useRouter } from "next/navigation";

function LogInSatus() {
  const router = useRouter();
  const { data: session } = useSession();

  const MovePhotoShot = () => {
    if (!session) {
      alert("로그인이 필요합니다");
      router.push("/logIn");
    } else {
      router.push("/photoShot");
    }
  };
  return (
    <>
      <span onClick={MovePhotoShot} href="/photoShot" className={styles.rentLink}>
        우산 대여하러 가기
      </span>
    </>
  );
}

export default LogInSatus;
