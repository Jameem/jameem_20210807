const db = require("../db/models")

// Get list of all categories
exports.listForSelect = async (req, res, next) => {
  try {
    const categories = await db.VideoCategory.findAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    }).catch((e) => {
      throw e
    })

    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully.",
      data: categories,
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
