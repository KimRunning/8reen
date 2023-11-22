import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <Link
        href="/photoShot
      "
        className={styles.navber}
      >
        Photo
      </Link>
    </>
  );
}

export default Navbar;
