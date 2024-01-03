import React from "react";
import SignUpComponent from "../components/signUp/signUp";
import styles from "./page.module.css";

function SignUp() {
  return (
    <>
      <main className={styles.signUpAll}>
        <SignUpComponent></SignUpComponent>
      </main>
    </>
  );
}

export default SignUp;
