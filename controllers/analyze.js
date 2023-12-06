const { Storage } = require("@google-cloud/storage");
const { Anaylize } = require("../database/index");

const credentialsPath = "kinetic-highway-407111-1902cdd0d9b5.json";

const { bucketName } = require("../config");
const storage = new Storage({
  keyFilename: credentialsPath,
});

exports.createAnalyze = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const bucket = storage.bucket(bucketName);
    const uniqueFilename =
      Date.now() + "-" + file.originalname + "user_" + req.userId;
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

    let imgPath = "";

    blobStream.on("finish", async () => {
      // Provide the public URL or any other relevant information

      await fileUpload.makePublic();

      imgPath = `https://storage.googleapis.com/${bucketName}/${uniqueFilename}`;

      const payload = {
        title: req.body.title,
        description: req.body.description,
        imgPath: imgPath,
        userId: req.userId,
      };
      const createdAnalysis = await Anaylize.create(payload);

      res.status(201).json({
        success: true,
        anaylysis: createdAnalysis,
      });
    });

    blobStream.end(file.buffer);

    // database call for create anaylizer
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllAnayzesByUser = async (req, res, next) => {
  try {
    const anaylysis = await Anaylize.findAll({
      where: {
        userId: req.userId,
      },
      include: ["User"],
    });

    res.status(201).json({
      success: true,
      anaylysis: anaylysis,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
