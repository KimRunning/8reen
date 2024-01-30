import connectToDatabase from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const db = await connectToDatabase();
    const { nickname } = req.query; // URL 쿼리에서 nickname 파라미터를 가져옴

    // 데이터베이스에서 사용자의 대여 상태를 조회
    const userStatus = await db.collection("rent").findOne({ nickname });

    if (!userStatus) {
      // 사용자의 상태 정보가 없는 경우
      return res.status(404).json({ message: "User not found" });
    }

    // 사용자의 대여 상태 반환
    res.status(200).json({ rented: userStatus.rented, count: userStatus.count });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
