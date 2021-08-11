const Sequelize = require("sequelize")
const path = require("path")
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path
const ffmpeg = require("fluent-ffmpeg")
ffmpeg.setFfmpegPath(ffmpegPath)

const db = require("../db/models")
const { validateInputs } = require("../utils/validate")
const validationAttributes =
  require("../utils/validation-attributes.json").video

// Create a new video
exports.create = async (req, res, next) => {
  try {
    let inputParams = JSON.parse(req.body.videoParams)

    inputParams.fileName = req.file.originalname
    inputParams.filePath = req.file.path.slice(7)

    // Generate the thumbnails and assign the file paths to inputParams
    const thumbnails = await generateThumbnails(req.file)

    inputParams = {
      ...inputParams,
      ...thumbnails,
    }

    // Insert in to the database
    const createdVideo = await db.Video.create(inputParams).catch((e) => {
      throw e
    })

    return res.status(201).send({
      success: true,
      message: "Video uploaded successfully",
      data: createdVideo,
    })
  } catch (error) {
    let message = "Uh-oh, Something went wrong!"

    console.error(error)
    return res.status(400).send({
      error: error && error.message ? error.message : error,
      success: false,
      message,
    })
  }
}

// Generate thumbnail for the specified video
const generateThumbnails = async (file) => {
  try {
    const directory = `public/uploads/videos`
    const filename = path.parse(file.filename).name

    const thumbnail64 = `thumbnail64-${filename}.png`
    const thumbnail128 = `thumbnail128-${filename}.png`
    const thumbnail256 = `thumbnail256-${filename}.png`

    // Generate thumbnail 64x64
    await ffmpeg(file.path).screenshots({
      timestamps: [0.0],
      filename: thumbnail64,
      folder: directory,
      size: "64x64",
    })

    // Generate thumbnail 128x128
    await ffmpeg(file.path).screenshots({
      timestamps: [0.0],
      filename: thumbnail128,
      folder: directory,
      size: "128x128",
    })

    // Generate thumbnail 256x256
    await ffmpeg(file.path).screenshots({
      timestamps: [0.0],
      filename: thumbnail256,
      folder: directory,
      size: "256x256",
    })

    return {
      thumbnail64: directory.slice(7) + "/" + thumbnail64,
      thumbnail128: directory.slice(7) + "/" + thumbnail128,
      thumbnail256: directory.slice(7) + "/" + thumbnail256,
    }
  } catch (error) {
    throw error
  }
}

// Validation middleware
exports.validate = async (req, res, next) => {
  try {
    // Validate input parameters

    let inputParams = JSON.parse(req.body.videoParams)
    const file = req.file

    // Validate input parameters
    const inputValidation = await validateInputs(
      inputParams,
      validationAttributes
    )

    if (!inputValidation.success) {
      return res.status(422).send({
        success: false,
        message: inputValidation.message,
        error: inputValidation.errors,
      })
    }

    // Check whether the video is uploaded
    if (!file) throw new Error("Please provide a file")

    //Check whether the video extension is valid
    const allowedFileTypes = [".mp4", ".mov"]
    const extension = path.parse(file.filename).ext

    if (!allowedFileTypes.includes(extension))
      throw new Error(`${extension} file is not allowed.`)

    // Check whther the file size exceeds the 200 MB limit
    if (file.size > 200000000)
      throw new Error(`File size can't be greater than 200 MB`)

    next()
  } catch (error) {
    let message = "Input validation failed!"

    console.error(error)
    return res.status(400).send({
      error: error && error.message ? error.message : error,
      success: false,
      message,
    })
  }
}

// List all the videos
exports.list = async (req, res, next) => {
  try {
    const videos = await db.Video.findAll({
      attributes: [
        "id",
        "title",
        "fileName",
        "filePath",
        "thumbnail64",
        "thumbnail128",
        "thumbnail256",
      ],
      include: {
        model: db.VideoCategory,
        attributes: ["id", "name"],
      },
      order: [["id", "DESC"]],
    }).catch((e) => {
      throw e
    })

    return res.status(200).send({
      success: true,
      message: "Videos fetched successfully.",
      data: videos,
    })
  } catch (error) {
    let message = "Uh-oh, Something went wrong!"

    console.error(error)
    return res.status(400).send({
      error: error && error.message ? error.message : error,
      success: false,
      message,
    })
  }
}
