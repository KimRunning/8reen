"use client";
import styles from "./page.module.css";
import ScanQrCode from "../components/qrcode/page";
import Photo from "../components/photo/photo";
import { useState } from "react";

function PhotoShot() {
  const [isQRMode, setIsQRMode] = useState(true);

  const toggleQRMode = () => {
    setIsQRMode(!isQRMode);
  };

  return (
    <main className={styles.PhotoSection}>
      <h1>반납 / 대여</h1>
      <section className={styles.figWrap}>
        <figcaption className={styles.PhotoTitle}>사진 또는 QR로 우산을 대여 / 반납 해보세요!</figcaption>
        {isQRMode ? <ScanQrCode /> : <Photo />}
        <button onClick={toggleQRMode}>{isQRMode ? "사진으로 인증하기" : "QR코드로 인증하기"}</button>
      </section>
    </main>
  );
}

export default PhotoShot;
