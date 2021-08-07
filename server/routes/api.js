var express = require("express")
var router = express.Router()

const videoCategory = require("../controllers/videoCategory")
const video = require("../controllers/video")

const fileUpload = require("../utils/fileUpload")

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Case Study API v1.0",
  })
)

// @route  Get api/video-categories
// @desc   Get all video categories
// @access Public
router.get("/video-categories", videoCategory.listForSelect)

// @route  Post api/videos
// @desc   Create a new video
// @access Public
router.post("/videos", fileUpload.single("video"), video.validate, video.create)

// @route  Get api/videos
// @desc   Get all videos
// @access Public
router.get("/videos", video.list)

module.exports = router
