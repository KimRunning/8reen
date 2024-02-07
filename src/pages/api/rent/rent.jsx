import multer from "multer";
import connectToDatabase from "../../../lib/mongodb";
import fs from "fs";
import path from "path";
import { IncomingMessage } from "http";
const uploadsDir = path.join("/tmp", "uploads"); // 절대 경로 사용

// 디렉토리가 없으면 생성
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const parseBody = req => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

// 파일 저장을 위한 디스크 스토리지 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/uploads"); // 파일이 저장될 경로
  },
  filename: function (req, file, cb) {
    // 파일명 설정: 업로드 날짜 + 원본 파일명
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// 파일 필터 설정: 이미지 파일만 허용
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // 이미지 파일일 경우 업로드 허용
  } else {
    cb(new Error("Only image files are allowed!"), false); // 이미지 파일이 아닐 경우 업로드 거부
  }
};

// multer 설정: 스토리지, 파일 필터, 최대 파일 크기
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 최대 파일 크기 5MB
  },
});

// multer를 사용한 파일 업로드 처리를 위한 미들웨어
const uploadMiddleware = (req, res, fieldName) => {
  return new Promise((resolve, reject) => {
    upload.single(fieldName)(req, res, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export default async function handler(req, res) {
  try {
    // 데이터베이스 연결
    const db = await connectToDatabase();

    if (req.method === "POST") {
      if (req.headers["content-type"].includes("multipart/form-data")) {
        // 파일 업로드 처리
        await uploadMiddleware(req, res, "photo");

        const { nickname } = req.body; // nickname 필드는 form-data의 일부로 전송됩니다.
        const photo = req.file; // 업로드된 파일 정보

        const update = {
          $set: { rented: true, photo: photo.path },
          $inc: { count: 1 },
        };

        const result = await db.collection("rent").updateOne({ nickname }, update, { upsert: true });
        res.json(result);
      } else {
        // 요청 본문 파싱
        const body = await parseBody(req);
        const { nickname, qrCode } = body;

        // QR 코드 데이터 처리 로직...
        const userStatus = await db.collection("rent").findOne({ nickname });
        const rentedStatus = userStatus ? !userStatus.rented : true;

        const update = {
          $set: { rented: rentedStatus, qrCode },
          $inc: { count: 1 },
        };

        const result = await db.collection("rent").updateOne({ nickname }, update, { upsert: true });
        res.json(result);
      }
    } else if (req.method === "PUT") {
      // 파일 업로드 처리 (반환 사진)
      await uploadMiddleware(req, res, "returnPhoto");

      const { nickname } = req.body; // nickname 필드는 form-data의 일부로 전송됩니다.
      const returnPhoto = req.file; // 업로드된 파일 정보

      const update = {
        $set: { rented: false, returnPhoto: returnPhoto.path },
      };

      const result = await db.collection("rent").updateOne({ nickname }, update);
      res.json(result);
    } else {
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
