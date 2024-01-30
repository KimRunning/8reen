import multer from "multer";
import connectToDatabase from "../../../lib/mongodb";

const upload = multer({ dest: "/tmp" });

export default function handler(req, res) {
  // multer 미들웨어를 Promise로 감싸기
  const uploadPromise = new Promise((resolve, reject) => {
    upload.single("photo")(req, res, err => {
      if (err) reject(err);
      else resolve();
    });
  });

  uploadPromise
    .then(async () => {
      const db = await connectToDatabase();
      const { nickname, qrCode } = req.body;
      const photo = req.file;

      let update;
      if (qrCode) {
        // QR 코드 데이터 처리
        const userStatus = await db.collection("rent").findOne({ nickname });
        const rentedStatus = userStatus ? !userStatus.rented : true;

        update = {
          $set: { rented: rentedStatus, qrCode },
          $inc: { count: 1 },
        };
      } else if (photo) {
        // 사진 업로드 처리
        update = {
          $set: { rented: true, photo: photo.path },
          $inc: { count: 1 },
        };
      } else {
        return res.status(400).json({ error: "No QR code or photo provided" });
      }

      const result = await db.collection("rent").updateOne({ nickname }, update, { upsert: true });
      res.json(result);
    })
    .catch(error => {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
