// pages/api/testdb.js
const connectToDatabase = require("../../lib/mongodb");

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    const data = await db.collection("rent").find({}).toArray(); // 적절한 쿼리 실행
    res.status(200).json(data); // 쿼리 결과를 응답으로 전송
  } catch (error) {
    console.error("Database connection error", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
