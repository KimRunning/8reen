import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <Link href="/signUp" className={styles.navber}>
        signUp
      </Link>
    </>
  );
}

export default Navbar;
