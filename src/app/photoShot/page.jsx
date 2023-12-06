import React from "react";
import styles from "./page.module.css";

function PhotoShot() {
  return (
    <>
      <main className={styles.PhotoSection}>
        <h1>대여/반납</h1>
        <section className={styles.figWrap}>
          <figure className={styles.PhotoShot}></figure>
          <figcaption className={styles.PhotoTitle}>사진을 찍어 우산을 대여 / 반납 해보세요!</figcaption>
        </section>
        <btnBox className={styles.PhotoShotBtnBox}>
          <button className={styles.PhotoShotBtn}>대여하기</button>
        </btnBox>
      </main>
    </>
  );
}

export default PhotoShot;
