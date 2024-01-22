import multer from "multer";
import connectToDatabase from "../../../lib/mongodb";

const upload = multer({ dest: "/tmp" });

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();

    if (req.method === "POST") {
      upload.single("photo")(req, res, async err => {
        if (err) return res.status(500).json({ error: err.message });

        const { nickname } = req.body;
        const photo = req.file;

        const update = {
          $set: { rented: true, photo: photo.path },
          $inc: { count: 1 },
        };

        const result = await db.collection("rent").updateOne({ nickname }, update, { upsert: true });
        res.json(result);
      });
    } else if (req.method === "PUT") {
      upload.single("returnPhoto")(req, res, async err => {
        if (err) return res.status(500).json({ error: err.message });

        const { nickname } = req.body;
        const returnPhoto = req.file;

        const update = {
          $set: { rented: false, returnPhoto: returnPhoto.path },
        };

        const result = await db.collection("rent").updateOne({ nickname }, update);
        res.json(result);
      });
    } else {
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
