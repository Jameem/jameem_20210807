const multer = require("multer")
const fs = require("fs")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { uploadDirectory = "videos" } = req.body

    const dir = `public/uploads/${uploadDirectory}`

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    return cb(null, dir)
  },
  filename: function (req, file, cb) {
    var filename = file.originalname
    var fileExtension = filename.split(".")[1]
    cb(null, Date.now() + "." + fileExtension)
  },
})

var fileUpload = multer({
  limits: {
    fieldNameSize: 100,
    fileSize: 1024 * 1024 * 200,
  },
  storage,
})

module.exports = fileUpload
