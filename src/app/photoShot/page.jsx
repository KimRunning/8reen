import React from "react";
import styles from "./page.module.css";

function PhotoShot() {
  return (
    <>
      <section className={styles.PhotoSection}>
        <figWrap className={styles.figWrap}>
          <figcaption className={styles.PhotoTitle}>사진을 찍어 우산을 대여 / 반납 해보세요!</figcaption>
          <figure className={styles.PhotoShot}></figure>
        </figWrap>
        <btnBox className={styles.PhotoShotBtnBox}>
          <button className={styles.PhotoShotBtn}>대여하기</button>
        </btnBox>
      </section>
    </>
  );
}

export default PhotoShot;
