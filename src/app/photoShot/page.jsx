"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import ScanQrCode from "../components/qrcode/page";

function PhotoShot() {
  const session = useSession().data;
  const [rented, setRented] = useState(false);
  const [isQRMode, setIsQRMode] = useState(true);
  const [cameraFacing, setCameraFacing] = useState("environment"); // 'user'는 전면, 'environment'는 후면 카메라
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 카메라 접근을 위한 useEffect
  useEffect(() => {
    let stream = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacing },
        });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (err) {
        console.error("카메라 접근 오류:", err);
      }
    }

    if (!isQRMode) {
      setupCamera();
    }

    // 컴포넌트 언마운트 시 스트림 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isQRMode, cameraFacing]);

  // 카메라 전환 함수
  const toggleCamera = () => {
    setCameraFacing(prevFacing => (prevFacing === "environment" ? "user" : "environment"));
  };

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
        console.log("resolve(blob):", resolve(blob));
      });
    });
  };

  const handleRent = async () => {
    try {
      const photoBlob = await capturePhoto();
      console.log("photoBlob:", photoBlob);
      if (!photoBlob) {
        console.log("Photo capture failed");
        return;
      }

      const formData = new FormData();
      formData.append("photo", photoBlob, "rent-photo.jpg");
      formData.append("nickname", session.user.name);
      console.log("formData:", formData);

      const response = await axios.post("/api/rent/rent", formData);

      if (response.status === 200) {
        setRented(true);
        alert("대여 완료");
      }
    } catch (error) {
      console.log("대여 요청 실패:", error);
    }
  };

  const handleReturn = async () => {
    try {
      const photoBlob = await capturePhoto();
      if (!photoBlob) {
        console.error("Photo capture failed");
        return;
      }

      const formData = new FormData();
      formData.append("returnPhoto", photoBlob, "return-photo.jpg");
      formData.append("nickname", session.user.name);

      const response = await axios.put("/api/rent/rent", formData);

      if (response.status === 200) {
        setRented(false);
        alert("반납 완료");
      }
    } catch (error) {
      console.error("반납 요청 실패:", error);
    }
  };

  const toggleQRMode = () => {
    setIsQRMode(!isQRMode);
  };

  return (
    <main className={styles.PhotoSection}>
      {rented ? <h1>반납</h1> : <h1>대여</h1>}
      <section className={styles.figWrap}>
        <figcaption className={styles.PhotoTitle}>사진 또는 QR로 우산을 대여 / 반납 해보세요!</figcaption>
        {isQRMode ? (
          <ScanQrCode />
        ) : (
          <>
            <figure className={styles.PhotoShot}>
              <video className={styles.PhotoShotZone} ref={videoRef}></video>
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </figure>

            {rented ? (
              <div className={styles.PhotoShotBtnBox}>
                <button className={styles.PhotoShotBtn} onClick={handleReturn}>
                  반납하기
                </button>
                <button onClick={toggleCamera} className={styles.PhotoShotBtn}>
                  {cameraFacing === "environment" ? "화면 전환" : "화면 전환"}
                </button>
              </div>
            ) : (
              <div className={styles.PhotoShotBtnBox}>
                <button className={styles.PhotoShotBtn} onClick={handleRent}>
                  대여하기
                </button>
                <button onClick={toggleCamera} className={styles.PhotoShotBtn}>
                  {cameraFacing === "environment" ? "화면 전환" : "화면 전환"}
                </button>
              </div>
            )}

            <p>우산과 우산택이 같이 나오게 촬영해주세요!</p>
          </>
        )}{" "}
        <button onClick={toggleQRMode}>{isQRMode ? "사진으로 인증하기" : "QR코드로 인증하기"}</button>
      </section>
    </main>
  );
}

export default PhotoShot;
