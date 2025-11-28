const express = require("express");
const multer = require("multer");
const { bucket } = require("../firebase");
const Image = require("../models/image");

const router = express.Router();

// multer 설정: 메모리 저장 (파일을 바로 Firebase로 넘김)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * 이미지 업로드 + Firebase Storage 저장 + DB 저장
 */
router.post("/upload", upload.single("image"), async (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!file || !title) return res.status(400).send("제목과 파일이 필요함");
  console.log(title);
  console.log(file);
  try {
    const ext = file.originalname.split(".").pop();
    const safeBase = file.originalname.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `gallery/${Date.now()}-${safeBase}.${ext}`;

    // Firebase Storage에 저장
    const fileRef = bucket.file(filename);
    await fileRef.save(file.buffer, {
      contentType: file.mimetype,
      metadata: { contentType: file.mimetype },
      resumable: false,
    });

    // 공개 URL 만들기
    await fileRef.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    // MongoDB에 저장
    const image = new Image({
      title,
      filename,
      imageUrl,
    });
    await image.save();

    res.json({
      message: "업로드 성공",
      imageUrl,
      title,
      _id: image._id,
    });
  } catch (err) {
    console.error("업로드 오류:", err);
    res.status(500).send("서버 오류");
  }
});

/**
 * 이미지 목록 불러오기
 */
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });

    const imageUrls = images.map((img) => ({
      _id: img._id,
      title: img.title,
      createdAt: img.createdAt,
      imageUrl: img.imageUrl,
    }));

    res.json(imageUrls);
  } catch (err) {
    console.error("이미지 목록 오류:", err);
    res.status(500).send("이미지 목록을 불러올 수 없음");
  }
});

/**
 * 이미지 삭제
 */
router.delete("/image/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).send("이미지를 찾을 수 없음");

    // Firebase Storage에서 삭제
    const fileRef = bucket.file(image.filename);
    await fileRef.delete().catch((err) => {
      console.error("Storage 파일 삭제 실패:", err);
    });

    res.json({ message: "삭제 완료" });
  } catch (err) {
    console.error("삭제 오류:", err);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
