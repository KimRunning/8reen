"use client";
import React from "react";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function MyInfo() {
  const [userData, setUserData] = useState("");
  const session = useSession().data;
  const nickname = session?.user?.name;
  const ImageUrl = session?.user?.image;

  useEffect(() => {
    const fetchRentedStatus = async () => {
      try {
        const response = await axios.get(`/api/rent/status?nickname=${session.user.name}`);
        setUserData(response.data);
      } catch (error) {
        console.error("상태 조회 실패:", error);
      }
    };

    if (nickname) {
      fetchRentedStatus();
    }
  }, [nickname]);

  console.log(userData);

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.infoSection}>내 정보</h1>
        <section className={styles.sectionWrap}>
          <div className={styles.profileWrap}>
            <img src={`${ImageUrl}`} alt="프로필 사진" className={styles.profileImage}></img>
            <h3 className={styles.profileName}>{nickname}</h3>
          </div>
        </section>
        <section className={styles.labelWrap}>
          <label className={styles.label}>
            &nbsp;<p style={{ color: "gray" }}>현재 우산 대여 상태 :</p> &nbsp; {userData.rented === true ? "대여 중" : "반납완료"}
          </label>
          <label className={styles.label}>
            &nbsp;<p style={{ color: "gray" }}>내가 줄인 탄소배출량 :</p> &nbsp; {userData.count * 14 + "G"}
          </label>
          <label className={styles.label}>
            &nbsp;<p style={{ color: "gray" }}>대여횟수 :</p> &nbsp; {userData.count}
          </label>
        </section>
      </main>
    </>
  );
}
