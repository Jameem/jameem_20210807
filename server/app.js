const express = require("express")
const path = require("path")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

require("dotenv").config()
const apiRouter = require("./routes/api")
const environment = process.env.NODE_ENV
const port = process.env.PORT || 5000

// Setup database connection
require("./db/models")

// Setup the express app
const app = express()

// Handle cross origin requests
app.use(cors())

app.use(express.json())

// Wire the api route
app.use("/api", apiRouter)

// Limiting number of requests from a source
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Setup default security headers
app.use(helmet())

// Setup the static folder
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the Case Study!!",
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port} in ${environment} environment`)
})
