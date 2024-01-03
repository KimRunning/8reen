"use client";

import { useState } from "react";
import styles from "./signUp.module.css";

function SignUpComponent() {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassWord] = useState("");

  const addData = async () => {
    const newData = {
      _id: 123,
      name: name,
      nickName: nickName,
      password: password,
    };
    console.log(newData);

    // const response = await fetch("/api/data", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newData),
    // });

    // if (response.ok) {
    //   console.log("Data added successfully");
    // } else {
    //   console.error("Failed to add data");
    // }
  };

  return (
    <>
      <section className={styles.inputSection}>
        <input
          type="text"
          name="nameInput"
          onChange={e => {
            setName(e.target.value);
          }}
          value={name}
        ></input>
        <input
          type="password"
          name="passWordInput"
          onChange={e => {
            setPassWord(e.target.value);
          }}
          value={password}
        ></input>
        <input
          type="text"
          name="nickNameInput"
          onChange={e => {
            setNickName(e.target.value);
          }}
          value={nickName}
        ></input>
        <button onClick={addData}>회원가입</button>
      </section>
    </>
  );
}

export default SignUpComponent;
