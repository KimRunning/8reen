import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <section className={styles.navWrap}>
        <Link
          href="/photoShot
      "
          className={styles.navbar}
        >
          Photo
        </Link>
        <Link
          href="/inquiry
      "
          className={styles.navbar}
        >
          Q&A
        </Link>
        <Link
          href="/myInfo
      "
          className={styles.navbar}
        >
          내정보
        </Link>
        {/* <Link
        href="/photoShot
      "
        className={styles.navbar}
      >
        Photo
      </Link> */}
      </section>
    </>
  );
}

export default Navbar;
