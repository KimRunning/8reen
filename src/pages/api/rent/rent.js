// pages/api/rent.js
const connectToDatabase = require("../../../lib/mongodb");

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();

    if (req.method === "POST") {
      // 대여하기 로직
      const { nickname, photo } = req.body;
      const update = {
        $set: { rented: true, photo },
        $inc: { count: 1 },
      };
      const result = await db.collection("rent").updateOne({ nickname }, update, { upsert: true });
      res.json(result);
    } else if (req.method === "PUT") {
      // 반납하기 로직
      const { nickname, returnPhoto } = req.body;
      const update = {
        $set: { rented: false, returnPhoto },
      };
      const result = await db.collection("rent").updateOne({ nickname }, update);
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
}
