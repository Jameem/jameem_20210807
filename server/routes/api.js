var express = require("express")
var router = express.Router()

// const entityController = require("./controllers/entityController")

router.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Case Study API v1.0",
  })
)

module.exports = router
