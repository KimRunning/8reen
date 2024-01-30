"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./loginSatus.module.css";

function LogInSatus() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Link href="/photoShot" className={styles.rentLink}>
          우산 대여하러 가기
        </Link>
      ) : (
        <Link href="/logIn" className={styles.rentLink}>
          우산 대여하러 가기
        </Link>
      )}
    </>
  );
}

export default LogInSatus;
