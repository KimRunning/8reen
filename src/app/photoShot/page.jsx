"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

function PhotoShot() {
  const session = useSession().data;
  const [rented, setRented] = useState(false);

  const handleRent = async () => {
    try {
      const response = await axios.post("/api/rent/rent", { nickname: session.user.name, photo: "dt" });
      if (response.status === 200) {
        setRented(true);
      }
    } catch (error) {
      console.error("Rent request failed:", error);
    }
  };

  const handleReturn = async () => {
    try {
      const response = await axios.put("/api/rent/rent", { nickname: session.user.name, returnPhoto: "returnPhotoData" });
      if (response.status === 200) {
        setRented(false);
      }
    } catch (error) {
      console.error("Return request failed:", error);
    }
  };

  return (
    <main className={styles.PhotoSection}>
      <h1>대여/반납</h1>
      <section className={styles.figWrap}>
        <figure className={styles.PhotoShot}></figure>
        <figcaption className={styles.PhotoTitle}>사진을 찍어 우산을 대여 / 반납 해보세요!</figcaption>
      </section>
      <div className={styles.PhotoShotBtnBox}>
        {rented ? (
          <button className={styles.PhotoShotBtn} onClick={handleReturn}>
            반납하기
          </button>
        ) : (
          <button className={styles.PhotoShotBtn} onClick={handleRent}>
            대여하기
          </button>
        )}
      </div>
    </main>
  );
}

export default PhotoShot;
