"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import styles from "./logout.module.css";

function Logout() {
  const { data: session } = useSession();
  const LogOutLogic = () => {
    signOut();
    alert("로그아웃 되었습니다");
  };

  return (
    <>
      {session ? (
        <div onClick={LogOutLogic} className={styles.logOutBox}>
          LogOut
        </div>
      ) : (
        <div className={styles.moveLogInBox}>
          <Link href="/logIn" className={styles.moveLogIn}>
            LogIn
          </Link>
        </div>
      )}
    </>
  );
}

export default Logout;
