"use client";
import Kakao from "next-auth/providers/kakao";
import { signOut, useSession } from "next-auth/react";
import React from "react";

function Logout() {
  const LogOutLogic = () => {
    signOut();
    console.log(useSession());
  };

  return (
    <>
      <button onClick={LogOutLogic}>로그아웃하기</button>
    </>
  );
}

export default Logout;
