"use client";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useSession } from "next-auth/react";
import axios from "axios";

function ScanQrCode() {
  const [cameraFacing, setCameraFacing] = useState("environment"); // 기본값은 'user'
  const session = useSession().data;
  const [rented, setRented] = useState(false); // 대여 상태를 관리하는 상태 변수

  useEffect(() => {
    // 모바일 기기인지 확인
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 모바일 기기라면 카메라를 후면 카메라로 설정
      setCameraFacing("environment");
    }
  }, []);

  // 카메라 전환 함수
  const toggleCamera = () => {
    setCameraFacing(prevFacing => (prevFacing === "environment" ? "user" : "environment"));
  };

  const handleRentReturn = async qrCode => {
    try {
      const response = await axios.post("/api/rent/rent", {
        nickname: session.user.name,
        qrCode: qrCode,
      });

      if (response.status === 200) {
        setRented(!rented);
        alert(rented ? "반납 완료" : "대여 완료");
      }
    } catch (error) {
      console.error(rented ? "반납 요청 실패:" : "대여 요청 실패:", error);
    }
  };

  const handleQRScan = data => {
    if (data) {
      handleRentReturn(data);
    }
  };

  const handleErrorQR = err => {
    console.error("QR 스캔 오류:", err);
  };

  return (
    <>
      <div>
        <QrReader delay={300} facingMode={cameraFacing} onError={handleErrorQR} onResult={handleQRScan} style={{ width: "100%" }} />
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button
            onClick={toggleCamera}
            style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#bdbdbd", border: "transparent", margin: "10px" }}
          >
            {cameraFacing === "environment" ? "화면전환" : "화면전환"}
          </button>
        </div>
        <p>QR 코드를 카메라 앞에 위치시켜주세요.</p>
      </div>
    </>
  );
}

export default ScanQrCode;
