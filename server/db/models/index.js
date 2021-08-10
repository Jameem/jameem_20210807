"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../../db/config.js")[env]
const db = {}

let sequelize

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

console.log("Connecting to database...")

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// Sync the database
sequelize.sync().then(function () {
  // Create initial categories
  const categories = [
    {
      id: 1,
      name: "Excercise",
    },
    {
      id: 2,
      name: "Education",
    },
    {
      id: 3,
      name: "Recipe",
    },
  ]

  sequelize.models.VideoCategory.bulkCreate(categories, {
    fields: ["id", "name"],
    updateOnDuplicate: ["name"],
  })
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
