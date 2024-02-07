const { MongoClient } = require("mongodb");

// MongoDB 연결을 캐싱하기 위한 변수
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    // 캐시된 연결 사용
    return cachedDb;
  }

  // 새로운 연결 생성
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();
  const db = client.db("8reen"); // 여기서 데이터베이스 이름을 명시하세요
  cachedDb = db; // 생성된 연결을 캐싱
  return db;
}

module.exports = connectToDatabase;
