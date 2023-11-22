import React from "react";
import styles from "./page.module.css";

export default function MyInfo() {
  return (
    <>
      <section className={styles.infoSection}>
        <figurWrap className={styles.profileWrap}>
          <nickName className={styles.profileImage}></nickName>
          <nickName className={styles.profileName}>프로필 닉네임 이라니깐?</nickName>
          <figcaption className={styles.profileText}>여따가는 뭘 쓸지 아직 모르겠네</figcaption>
        </figurWrap>
        <labelWrap className={styles.labelWrap}>
          <label className={styles.label}>빌린 횟수?</label>
          <label className={styles.label}>등급</label>
          <label className={styles.label}>반납 일 or 마지막 사용일</label>
        </labelWrap>
      </section>
    </>
  );
}
