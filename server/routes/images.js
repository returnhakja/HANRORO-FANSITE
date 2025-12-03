const express = require("express");
const Image = require("../models/image");
const router = express.Router();

router.get("/images/random", async (req, res) => {
  try {
    const image = await Image.aggregate([{ $sample: { size: 1 } }]);
    res.json(image[0]);
  } catch (err) {
    res.status(500).json({ error: "랜덤 이미지 불러오기 실패" });
  }
});

module.exports = router;
