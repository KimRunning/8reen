"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

function PhotoShot() {
  const session = useSession().data;
  const [rented, setRented] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 카메라 접근을 위한 useEffect
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("카메라 접근 오류:", err));
    }
  }, []);

  // 사용자 상태 조회를 위한 useEffect
  useEffect(() => {
    const fetchRentedStatus = async () => {
      try {
        const response = await axios.get(`/api/rent/status?nickname=${session.user.name}`);
        setRented(response.data.rented);
      } catch (error) {
        console.error("상태 조회 실패:", error);
      }
    };

    if (session?.user?.name) {
      fetchRentedStatus();
    }
  }, [session?.user?.name]);

  const capturePhoto = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(blob);
      });
    });
  };

  const handleRent = async () => {
    try {
      const photoBlob = await capturePhoto();
      const formData = new FormData();
      formData.append("photo", photoBlob, "rent-photo.jpg");
      formData.append("nickname", session.user.name);

      const response = await axios.post("/api/rent/rent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setRented(true);
        alert("대여 완료");
      }
    } catch (error) {
      console.error("대여 요청 실패:", error);
    }
  };

  const handleReturn = async () => {
    try {
      const photoBlob = await capturePhoto();
      const formData = new FormData();
      formData.append("returnPhoto", photoBlob, "return-photo.jpg");
      formData.append("nickname", session.user.name);

      const response = await axios.put("/api/rent/rent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setRented(false);
        alert("반납 완료");
      }
    } catch (error) {
      console.error("반납 요청 실패:", error);
    }
  };

  return (
    <main className={styles.PhotoSection}>
      <h1>대여/반납</h1>
      <section className={styles.figWrap}>
        <figure className={styles.PhotoShot}>
          <video className={styles.PhotoShotZone} ref={videoRef} autoPlay></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </figure>
        <figcaption className={styles.PhotoTitle}>사진을 찍어 우산을 대여 / 반납 해보세요!</figcaption>
      </section>
      <div className={styles.PhotoShotBtnBox}>
        {rented ? (
          <button className={styles.PhotoShotBtn} onClick={handleReturn}>
            반납하기
          </button>
        ) : (
          <button className={styles.PhotoShotBtn} onClick={handleRent}>
            대여하기
          </button>
        )}
      </div>
    </main>
  );
}

export default PhotoShot;
