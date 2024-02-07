"use client";
import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

function ScanQrCode() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false); // 스캔 진행 중인지를 나타내는 상태
  const router = useRouter();

  useEffect(() => {
    let animationFrameId; // requestAnimationFrame의 ID를 저장하기 위한 변수

    const startScan = () => {
      animationFrameId = requestAnimationFrame(scanQRCode);
      setIsScanning(true);
    };

    const stopScan = () => {
      cancelAnimationFrame(animationFrameId);
      setIsScanning(false);
    };

    const scanQRCode = () => {
      const context = canvasRef.current.getContext("2d");

      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvasRef.current.height = videoRef.current.videoHeight;
        canvasRef.current.width = videoRef.current.videoWidth;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code && isScanning) {
          console.log("Found QR code", code.data);
          handleQRData(code.data);
          stopScan(); // 스캔 후 스캔 중지
        }
      }
      animationFrameId = requestAnimationFrame(scanQRCode); // 다음 프레임에 스캔 계속
    };

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play().catch(err => {
            console.error("비디오 재생 실패:", err);
          });
        });
        startScan(); // 카메라 접근에 성공하면 스캔 시작
      })
      .catch(err => {
        setError("카메라 접근에 실패했습니다. 카메라 권한을 확인해주세요.");
        console.error(err);
      });

    return () => {
      // 컴포넌트 언마운트 시 requestAnimationFrame 정리
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleQRData = async qrData => {
    try {
      const response = await axios.post("/api/rent/rent", {
        userId: session.user.id, // 사용자 세션에서 ID 추출
        qrCode: qrData,
      });

      if (response.data.success) {
        alert(`작업 성공: ${response.data.message}`);
        router.push(`/myInfo/${session.user.name}`);
      } else {
        alert(`작업 실패: ${response.data.message || "알 수 없는 오류가 발생했습니다."}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "서버 요청 중 문제가 발생했습니다.";
      console.error("서버 요청 실패:", error);
      alert(`작업 실패: ${errorMessage}`);
    }
  };

  const handleScanButtonClick = () => {
    startScan(); // "다시 스캔하기" 버튼 클릭 시 스캔 시작
  };

  return (
    <>
      <figure className={styles.PhotoShot}>
        {error && <p>{error}</p>}
        <video ref={videoRef} className={styles.PhotoShotZone}></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </figure>
      <div>
        <button onClick={handleScanButtonClick}>다시 스캔하기</button>
      </div>
    </>
  );
}

export default ScanQrCode;
