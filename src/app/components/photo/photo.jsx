"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import styles from "./photo.module.css";
import { useRouter } from "next/navigation";

function Photo() {
  const [cameraFacing, setCameraFacing] = useState("environment");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const session = useSession().data;
  const [rented, setRented] = useState(false); // 대여 상태를 관리하는 상태 변수
  const router = useRouter();
  // 카메라 전환 함수
  const toggleCamera = () => {
    setCameraFacing(prevFacing => (prevFacing === "environment" ? "user" : "environment"));
  };

  useEffect(() => {
    let stream = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacing },
        });
        videoRef.current.srcObject = stream;
        // 비디오 메타데이터가 로드된 후 재생을 시도합니다.
        videoRef.current.addEventListener("loadedmetadata", function () {
          videoRef.current.play().catch(error => {
            // 여기에서 오류 처리 로직을 구현합니다.
            console.error("비디오 재생 실패:", error);
            alert("비디오를 재생할 수 없습니다. 카메라 권한을 확인해주세요.");
          });
        });
      } catch (err) {
        console.error("카메라 접근 오류:", err);
        alert("카메라에 접근할 수 없습니다. 설정에서 카메라 접근 권한을 확인해주세요.");
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraFacing]);

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
      if (!photoBlob) {
        alert("사진 촬영에 실패했습니다.");
        return;
      }

      const formData = new FormData();
      formData.append("photo", photoBlob, "rent-photo.jpg");
      formData.append("nickname", session.user.name);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post("/api/rent/rent", formData);

      if (response.status === 200) {
        setRented(true);
        alert("대여 완료");
        router.push("/myInfo");
      } else {
        throw new Error("대여 처리 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("대여 요청 실패:", error);
      alert("대여 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
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
        router.push("/myInfo");
      }
    } catch (error) {
      console.error("반납 요청 실패:", error);
    }
  };

  return (
    <>
      <figure className={styles.PhotoShot}>
        <video className={styles.PhotoShotZone} ref={videoRef}></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </figure>
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
        <button onClick={toggleCamera} className={styles.PhotoShotBtn}>
          화면 전환
        </button>
      </div>
      <p>우산과 우산택이 같이 나오게 촬영해주세요!</p>
    </>
  );
}

export default Photo;
