// server.js

const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const credentialsPath = "kinetic-highway-407111-1902cdd0d9b5.json";
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./.env",
});
const app = express();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// import route files
const authRoutes = require("./routes/auth.js");
const analyzeRouter = require("./routes/analyze.js");

// mount routes

app.use("/api/auth", authRoutes); //http://localhost:3001/api/auth/register
app.use("/api/analysis", analyzeRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Replace 'your-bucket-name' with your actual bucket name
const bucketName = "buckettomatprojekt";
const storage = new Storage({
  keyFilename: credentialsPath,
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const bucket = storage.bucket(bucketName);
    const uniqueFilename = Date.now() + "-" + file.originalname;
    const fileUpload = bucket.file(uniqueFilename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });

    blobStream.on("finish", () => {
      // Provide the public URL or any other relevant information
      res.status(200).json({
        imageUrl: `https://storage.googleapis.com/${bucketName}/${uniqueFilename}`,
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
