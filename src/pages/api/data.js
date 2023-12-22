// pages/api/data.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const uri = "mongodb+srv://msk7316:%21%40%23rlaalstjr123@8reenshare.kwwucto.mongodb.net/?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();

  if (req.method === "GET") {
    const data = await db.collection("SignUp").find().toArray();
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // 클라이언트에서 보낸 데이터를 받음
    const newData = req.body;

    try {
      // 컬렉션에 새로운 데이터 추가
      const result = await db.collection("SignUp").insertOne(newData);
      res.status(201).json(result);
    } catch (error) {
      // 데이터베이스 에러 처리
      res.status(500).json({ message: "Failed to add data", error });
    }
  }

  // 다른 HTTP 메서드에 대한 핸들링 로직 추가 가능

  client.close();
}
