"use client";
import { QrReader } from "react-qr-reader";
import { useSession } from "next-auth/react";
import axios from "axios";

function ScanQrCode() {
  const session = useSession().data;

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
    <div>
      <QrReader delay={300} onError={handleErrorQR} onResult={handleQRScan} style={{ width: "100%" }} />
      <p>QR 코드를 카메라 앞에 위치시켜주세요.</p>
    </div>
  );
}

export default ScanQrCode;
