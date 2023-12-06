import React from "react";
import styles from "./page.module.css";

export default function MyInfo() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.infoSection}>내 정보</h1>
        <section className={styles.sectionWrap}>
          <div className={styles.profileWrap}>
            <nickName className={styles.profileImage}></nickName>
            <nickName className={styles.profileName}>프로필 닉네임 이라니깐?</nickName>
            <figcaption className={styles.profileText}>여따가는 뭘 쓸지 아직 모르겠네</figcaption>
          </div>
        </section>
        <section className={styles.labelWrap}>
          <label className={styles.label}>현재 상태 대여중 or 반납완료</label>
          <label className={styles.label}>환경 기여도</label>
          <label className={styles.label}>남은 대여기간 or 마지막 사용일</label>
        </section>
      </main>
    </>
  );
}
