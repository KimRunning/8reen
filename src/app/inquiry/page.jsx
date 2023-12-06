import React from "react";
import styles from "./page.module.css";

function Inquiry() {
  return (
    <>
      <main className={styles.main}>
        <h1>문의</h1>
        <div className={styles.listBtnWrap}>
          <section className={styles.listWrap}>
            <article className={styles.list}>프로필 네임 / 제목 </article>
            <article className={styles.list}>프로필 네임 / 제목 </article>
            <article className={styles.list}>프로필 네임 / 제목 </article>
          </section>
          <section className={styles.btnBox}>
            <button className={styles.postingBtn}> 문의하기</button>
          </section>
        </div>
      </main>
    </>
  );
}

export default Inquiry;
