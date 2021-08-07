const { Validator } = require("node-input-validator")

exports.validateInputs = async (input, attributes) => {
  const v = new Validator(input, attributes)

  const matched = await v.check()

  if (!matched) {
    return {
      errors: v.errors,
      success: false,
      message: "Input validation failed",
    }
  }

  return {
    success: true,
    message: "Input validation success",
  }
}
