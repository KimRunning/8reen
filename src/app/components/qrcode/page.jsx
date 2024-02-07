"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ScanQrCode() {
  const [data, setData] = useState("QR 코드를 스캔해주세요");
  const [cameraFacing, setCameraFacing] = useState("environment");
  const { data: session } = useSession();
  const router = useRouter();

  const handleQRScan = (result, error) => {
    if (!!result) {
      setData(result?.text);
      // QR 코드 데이터와 사용자 세션 정보를 사용하여 서버에 요청을 보냅니다.
      // 예시: 대여 또는 반납 처리
      axios
        .post("/api/rent/rent", {
          qrCode: result.text,
          nickname: session.user.name,
        })
        .then(response => {
          alert("처리 성공");
          router.push("/myInfo");
          // 처리 성공 후 리다이렉션 또는 추가 로직
        })
        .catch(error => {
          console.error("처리 실패:", error);
          alert("처리 중 오류가 발생했습니다.");
        });
    }

    if (!!error) {
      console.error(error);
    }
  };

  const toggleCamera = () => {
    setCameraFacing(prevFacing => (prevFacing === "environment" ? "user" : "environment"));
  };

  return (
    <div>
      <h3>{data}</h3>
      <QrReader delay={300} facingMode={cameraFacing} onResult={handleQRScan} style={{ width: "100%" }} />
      <button onClick={toggleCamera}>카메라 전환</button>
    </div>
  );
}

export default ScanQrCode;
